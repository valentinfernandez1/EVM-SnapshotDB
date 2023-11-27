import Web3, { Contract, HttpProvider, WebSocketProvider } from 'web3';
import saga721Abi from '../constants/abi/saga721Abi.json';
import DMarket721Abi from '../constants/abi/dmarket721Abi.json';
import { RPC_EVENT_BLOCK_RANGE, date, endBlock, nftBatchSize } from '../constants/utility';
import NftCollection, { I_NftCollection, I_NftCollectionData } from '../models/Nfts/NftCollection';
import Nft, { I_Nft } from '../models/Nfts/Nft';
require('dotenv').config();

const RPC_WS_URL = process.env.RPC_WS_URL;
const timeout = 500;

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

	const nfts: I_NftCollection[] = await NftCollection.find({}, 'address type -_id');

	//Query historic events to get the tokenIds for an Nft Collection
	/* 	console.log(`[NftScraper] Starting scraping process for ${nfts.length} NFT collections`);
	for await (const nft of nfts) {
		await findNftIds(nft, endBlock, chainWs);
	}
	console.log(`[NftScraper] Nft tokenId scraping done`); */

	//Query data of Nft Collection and token of the collection
	console.log(`[NftScraper] Starting token data population`);
	for await (const nft of nfts) {
		await populateNftData(nft, chainWs);
	}
};

const findNftIds = async (nft: I_NftCollection, endBlock: number, chainWs: Web3): Promise<void> => {
	await Nft.deleteMany({ address: nft.address });

	console.log(`[NftScraper] ${date()} - Processing ${nft.address}`);
	let currentBlock = 0;
	let ongoingPromises = 0;
	let retrievedIds = [];
	let nftPromises = [];
	while (currentBlock < endBlock) {
		for (ongoingPromises; ongoingPromises < nftBatchSize; ongoingPromises++) {
			let fromBlock = currentBlock;
			let toBlock = Math.min(fromBlock + RPC_EVENT_BLOCK_RANGE, endBlock);
			currentBlock = toBlock;

			if (fromBlock == toBlock) continue;

			let abi = [];
			nft.type == 'Saga721' ? (abi = saga721Abi) : (abi = DMarket721Abi);
			const contract = new chainWs.eth.Contract(abi, nft.address);

			//console.log(`${nft.address} from ${fromBlock} to ${toBlock}`);
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

	//Filter duplicated Ids and format data
	retrievedIds = [...new Set(retrievedIds)];
	retrievedIds = retrievedIds.map((id): I_Nft => {
		return { id, collectionAddress: nft.address };
	});

	//Store tokenIds in DB
	await Nft.insertMany(retrievedIds);
	console.log(
		`[NftScraper] ${date()} - Collection ${nft.address.slice(0, 4)}..${nft.address.slice(
			nft.address.length - 4,
			nft.address.length
		)} found ${retrievedIds.length} tokens`
	);
};

//Queries a range of block events to find Nft transfers containing tokenId data.
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

const populateNftData = async (nft: I_NftCollection, chainWs: Web3) => {
	let abi = [];
	nft.type == 'Saga721' ? (abi = saga721Abi) : (abi = DMarket721Abi);

	const contract = new chainWs.eth.Contract(abi, nft.address);

	//Get Nft collection data
	const collectionData: I_NftCollectionData = {
		name: await contract.methods.name().call(),
		symbol: await contract.methods.symbol().call(),
		minter: await contract.methods.owner().call(),
	};

	console.log(collectionData);

	/* 	let ongoingPromises = 0;
	let nftPromises = [];
	while (nftIds.length > 0) {
		let tokenId = nftIds.pop();

		nftPromises.push(async () => {
			let nft: I_Nft = {
				id: tokenId,
				owner: await contract.methods.ownerOf(tokenId).call(),
			};
		});
	} */
};
