import Storage, { I_Storage, I_StorageState } from '../models/Storage';
import Code from '../models/Code';
import { BLOCK_HASH, amountOfKeys, storageConcurrentLimit } from '../constants/utility';
import { I_StorageRangeResponse } from '../utils/interfaces';
import Web3, { WebSocketProvider } from 'web3';

const timeout = 2000;
const block = BLOCK_HASH;
require('dotenv').config();
const RPC_WS_URL = process.env.RPC_WS_URL;

export const extractStorages = async () => {
	//Purge all storages that are not in this block
	await Storage.deleteMany({ block: { $ne: block } });

	console.log('🔎 Filtering already stored Storage contracts');
	let contracts: string[] = await contractsToScrape();
	console.log(`📦 ${contracts.length} contract storages to be scraped`);

	//Instatiate websocket
	console.log('Starting WebSocket connection');
	const customWsProvider = new WebSocketProvider(RPC_WS_URL, {
		headers: {
			'X-API-Key': process.env.BESU_API_KEY,
		},
		timeout: 60000,
	});

	const chainWs = new Web3(customWsProvider);

	let ongoingPromises = 0;
	let storagePromises = [];
	while (contracts.length > 0) {
		for (ongoingPromises; ongoingPromises < storageConcurrentLimit; ongoingPromises++) {
			let index = contracts.length;
			let contractAddress = contracts.pop();

			if (contractAddress == null) continue;
			storagePromises.push(
				getContractStorage(contractAddress, index, chainWs).then(() => {
					ongoingPromises -= 1;
				})
			);
		}

		await new Promise((resolve) => setTimeout(resolve, Number(timeout)));
	}

	await Promise.all(storagePromises);

	console.log('✅ Storage scrapping finished');
};

const getContractStorage = async (contract: string, i: number, chainWs: Web3) => {
	let exit = false;
	let created = false;
	let fromHash = null;

	while (!exit) {
		//Check if there's already a storage to continue pulling
		if (!fromHash) {
			let continueFrom = await Storage.findOne(
				{
					address: contract,
					nextHash: { $ne: null },
				},
				'nextHash -_id'
			).lean();

			if (continueFrom) {
				created = true;
				fromHash = continueFrom.nextHash;
			}
		}

		let partial: I_Storage = await getPartialStorage(contract, amountOfKeys, i, chainWs, fromHash);

		fromHash = partial.nextHash;

		//If no nextHash the contract query is complete
		if (!partial.nextHash) {
			exit = true;
		}

		if (!created) {
			await Storage.create(partial);
			created = true;
		} else {
			try {
				await Storage.findOneAndUpdate(
					{ address: contract, full: false },
					{ $push: { storageState: partial.storageState }, $set: { nextHash: partial.nextHash } }
				);

				// Set all the associated nextHash as null,
				// this means that the contract storage pull was complete
				!partial.nextHash
					? await Storage.updateMany({ address: contract }, { $set: { nextHash: null } })
					: null;
			} catch (error) {
				if (error.codeName != 'BSONObjectTooLarge') {
					console.log(error);
					process.exit();
				}

				await handleStorageOverflow(partial);
			}
		}
	}
	console.log(`💯 Succesfully stored contract ${contract}`);
};

//Obtain a certain amount of keys from a contract Storage starting from a storage key
const getPartialStorage = async (
	contract: string,
	amountOfKeys: number, //Amount to retrieve from the chain
	index: number, //Needed for request id
	chainWs: Web3,
	from_hash?: string //If null it starts from the first key in storage
): Promise<I_Storage> => {
	let starting_key = '0x0000000000000000000000000000000000000000000000000000000000000000';
	from_hash ? (starting_key = from_hash) : null;
	let response: I_StorageRangeResponse;
	try {
		response = (
			await chainWs.currentProvider.request({
				method: 'debug_storageRangeAt',
				jsonrpc: '2.0',
				id: index,
				params: [block, 0, contract, starting_key, amountOfKeys],
			})
		).result as I_StorageRangeResponse;
	} catch (error) {
		console.log(error);
	}

	console.log(`🕒 ${contract} - ${new Date().toTimeString().split(' ')[0]}`);
	let partial_storage = formatStorageData(response.storage);

	let partialContractStorage: I_Storage = {
		address: contract,
		storageState: partial_storage,
		nextHash: response.nextKey,
		block,
	};

	return partialContractStorage;
};

const contractsToScrape = async (): Promise<string[]> => {
	//Get contract list from DB
	let contracts: string[] = (await Code.find({}, 'address -_id')).map((contract) => {
		return contract.address;
	});

	//Get already stored Storages for this block
	let storages: string[] = (
		await Storage.find({ block: { $eq: block }, nextHash: null }, 'address -_id')
	).map((storage) => {
		return storage.address;
	});

	let unfinishedStorages: string[] = (
		await Storage.find({ block: { $eq: block }, nextHash: { $ne: null } }, 'address -_id')
	).map((storage) => {
		return storage.address;
	});

	// Filter contracts that are already stored
	// or if stored they were not completed
	contracts = contracts.filter((contract) => {
		return storages.indexOf(contract) === -1 || unfinishedStorages.indexOf(contract) != -1;
	});

	return contracts;
};

const formatStorageData = (raw_storage: any): I_StorageState[] => {
	let storageData: I_StorageState[] = [];

	Object.keys(raw_storage).forEach((hash) => {
		storageData.push({
			key: raw_storage[hash].key,
			value: raw_storage[hash].value,
		});
	});

	return storageData;
};

const handleStorageOverflow = async (partialStorage: I_Storage) => {
	//Mark the current storage document as full
	await Storage.findOneAndUpdate(
		{ address: partialStorage.address, full: false },
		{ $set: { full: true, nextHash: null } }
	);

	//Create new storage document for contract
	//and include the partial state
	await Storage.create({
		address: partialStorage.address,
		storageState: partialStorage.storageState,
		block: partialStorage.block,
		nextHash: partialStorage.nextHash,
	});
};
