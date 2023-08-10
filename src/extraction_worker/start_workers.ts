import { extractAccounts } from './accountsData';
import { getAccountsToQuery } from './getAccountsToQuery';
import { extractStorages } from './contractStorage';
import { getAccountsFromBE } from './getAccountsFromBE';
import Address from '../models/Address';
import WebSocketProvider from 'web3-providers-ws';
import Web3 from 'web3';

require('dotenv').config();

export const start_extraction_workers = async () => {
	let accounts: string[] = await getAccountsToQuery();

	//Instatiate websocket
	console.log('Starting WebSocket connection');
	const customWsProvider = new WebSocketProvider('wss://p-reader.mythical.engineering/ws', {
		headers: {
			'X-API-Key': process.env.BESU_API_KEY,
		},
		timeout: 60000,
	});

	const chainWs = new Web3(customWsProvider);

	await extractAccounts(accounts, chainWs);
	await extractStorages(chainWs);
	return;
};
