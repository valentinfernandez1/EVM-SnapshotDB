import Web3, { Contract, HttpProvider, WebSocketProvider } from 'web3';
import saga721Abi from '../constants/abi/saga721Abi.json';
import DMarket721Abi from '../constants/abi/dmarket721Abi.json';
import { RPC_EVENT_BLOCK_RANGE, endBlock, nftBatchSize } from '../constants/utility';
import { E_NftType, I_Nft, I_NftCollection } from '../models/Nft';
require('dotenv').config();

const RPC_WS_URL = process.env.RPC_WS_URL;

const timeout = 2000;
let nfts: I_NftCollection[] = [
	{ address: '0xdad15807359b449c80bc85b1ec13ed5b4addb4b4', type: E_NftType.Saga721 },
];

//TODO: change nfts array to use database info with address and type.
export const nftScraper = async () => {
	//Instatiate websocket
	console.log('Starting WebSocket connection');
	const customWsProvider = new WebSocketProvider(RPC_WS_URL, {
		headers: {
			'X-API-Key': process.env.BESU_API_KEY,
		},
		timeout: 60000,
	});
	const chainWs = new Web3(customWsProvider);

	for await (const nft of nfts) {
		await scrapeNft(nft, endBlock, chainWs);
	}
};

const scrapeNft = async (nft: I_NftCollection, endBlock: number, chainWs: Web3): Promise<void> => {
	let currentBlock = 0;
	console.log(endBlock);

	let ongoingPromises = 0;
	let retrievedIds = [];
	let nftPromises = [];
	while (currentBlock < endBlock) {
		for (ongoingPromises; ongoingPromises < nftBatchSize; ongoingPromises++) {
			let fromBlock = currentBlock;
			let toBlock = fromBlock + RPC_EVENT_BLOCK_RANGE;
			toBlock > endBlock ? (toBlock = endBlock) : null;
			currentBlock = toBlock;

			let abi = [];
			nft.type == E_NftType.Saga721 ? (abi = saga721Abi) : (abi = DMarket721Abi);

			const contract = new chainWs.eth.Contract(abi, nft.address);

			console.log(`${nft.address} from ${fromBlock} to ${toBlock}`);
			nftPromises.push(
				retrieveTokenIds(contract, fromBlock, toBlock).then((nftIds) => {
					ongoingPromises -= 1;
					nftIds.length ? retrievedIds.push(...nftIds) : null;
				})
			);
		}

		await new Promise((resolve) => setTimeout(resolve, Number(timeout)));
	}
	await Promise.all(nftPromises);

	//Filter duplicated Ids
	retrievedIds = [...new Set(retrievedIds)];
	console.log(retrievedIds.length);
	//Store in db
};

const retrieveTokenIds = async (
	contract: Contract<any>,
	fromBlock: number,
	toBlock: number
): Promise<BigInt[]> => {
	// Listen for Transfer events
	// @ts-ignore
	let result = await contract.getPastEvents('Transfer', {
		fromBlock,
		toBlock,
	});

	let tokenIds: BigInt[] = [];
	result.forEach((event) => {
		// @ts-ignore
		let tokenId = event.returnValues.tokenId;

		tokenIds.indexOf(tokenId) === -1 ? tokenIds.push(tokenId) : null;
	});

	return tokenIds;
};

/* const populateNftsData = async (nftIds: number[], contractData: I_NftCollection, chainWs: Web3) => {
	let abi = [];
	contractData.type == E_NftType.Saga721 ? (abi = saga721Abi) : (abi = DMarket721Abi);
	let contract = new chainWs.eth.Contract(abi, contractData.address);

	let ongoingPromises = 0;
	let nftPromises = [];
	while (nftIds.length > 0) {
		let tokenId = nftIds.pop();

		nftPromises.push(async () => {
			let nft: I_Nft = {
				id: tokenId,
				owner: await contract.methods.ownerOf(tokenId).call(),
			};
		});
	}
}; */
