import Account, { I_Account } from '../models/Account';
import { accountsBatchSize, BLOCK_HASH } from '../constants/utility';
import Code, { I_Code } from '../models/Code';
import Web3, { WebSocketProvider } from 'web3';

require('dotenv').config();
const RPC_WS_URL = process.env.RPC_WS_URL;

const timeout = 2000;
const block = BLOCK_HASH;

require('dotenv').config();

export const extractAccounts = async (accounts: string[]) => {
	//Instatiate websocket
	console.log('Starting WebSocket connection');
	const customWsProvider = new WebSocketProvider(RPC_WS_URL, {
		headers: {},
		timeout: 60000,
	});

	const chainWs = new Web3(customWsProvider);

	console.log(`👥 ${accounts.length} accounts to be scraped`);

	let ongoingPromises = 0;
	let accountPromises = [];
	while (accounts.length > 0) {
		for (ongoingPromises; ongoingPromises < accountsBatchSize; ongoingPromises++) {
			let accountAddress = accounts.pop();

			accountPromises.push(
				getAccountData(accountAddress, chainWs).then(() => {
					ongoingPromises -= 1;
					console.log(`${accounts.length} accounts left`);
				})
			);
		}

		await new Promise((resolve) => setTimeout(resolve, Number(timeout)));
	}
	await Promise.all(accountPromises);
	console.log(`✅ Account scrapping done`);
};

const getAccountData = async (account: string, chainWs: Web3): Promise<I_Account> => {
	if (!account) return;
	let accountData: I_Account = {
		address: account,
		balance: (await chainWs.eth.getBalance(account, block)).toString(),
		nonce: Number(await chainWs.eth.getTransactionCount(account, block)),
		block,
	};
	Account.create(accountData).catch((err) => {
		console.log(err);
	});

	const contractCode: I_Code = await getCode(account, chainWs);

	//Verify if the account is not a contract
	if (contractCode.code.length <= 2) {
		return;
	}

	Code.create(contractCode).catch((err) => {
		console.log(err);
	});
};

const getCode = async (account: string, chainWs: Web3): Promise<I_Code> => {
	let data: I_Code = {
		address: account,
		code: await chainWs.eth.getCode(account, block),
	};

	return data;
};
