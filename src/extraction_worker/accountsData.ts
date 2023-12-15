import Account, { I_Account } from '../models/Account';
import { accountsBatchSize, BLOCK_HASH } from '../constants/utility';
import Code, { I_Code } from '../models/Code';
import Web3, { WebSocketProvider } from 'web3';
import blake2 from 'blake2';

require('dotenv').config();
const RPC_WS_URL = process.env.RPC_WS_URL;

const timeout = 2000;
const block = BLOCK_HASH;

require('dotenv').config();

export const extractAccounts = async (accounts: string[]) => {
	//Instatiate websocket
	console.log('Starting WebSocket connection');
	const customWsProvider = new WebSocketProvider(RPC_WS_URL, {
		headers: {
			'X-API-Key': process.env.BESU_API_KEY || '',
		},
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
	console.log(`✅ Account scraping done`);
};

const getAccountData = async (account: string, chainWs: Web3): Promise<I_Account> => {
	if (!account) return;
	let accountData: I_Account = {
		address: account,
		balance: (await chainWs.eth.getBalance(account, block)).toString(),
		nonce: Number(await chainWs.eth.getTransactionCount(account, block)),
		block,
	};

	//If account empty it can be discarded
	if (accountData.balance == '0' && accountData.nonce == 0) {
		return;
	}

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
	let code = await chainWs.eth.getCode(account, block);
	let hash = blake2.createHash('blake2b');
	hash.update(Buffer.from(code));

	let data: I_Code = {
		address: account,
		code,
		hash: hash.digest('hex'),
	};

	return data;
};

//Nft Hash = 30b594fe237e26085cc0d00d78d7cf13628fd3ca10cb5ee8f8e085eba52dcbe9b758f99712c6280f9747b6f5e81dcad226f2c5de1b89bbaf27426302949d69ef
