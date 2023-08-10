import Account, { I_Account } from '../models/Account';
import { accountsBatchSize, BLOCK_HASH } from '../constants/utility';
import Code, { I_Code } from '../models/Code';
import Web3 from 'web3';

const block = BLOCK_HASH;

export const extractAccounts = async (accounts: string[], chainWs: Web3) => {
	console.log(`👥 ${accounts.length} accounts to be scraped`);
	console.log(accounts);

	let skip = 0;
	let iterations = Math.ceil(accounts.length / accountsBatchSize);
	for (let i = 0; i < iterations; i++) {
		console.log(`🟡 Account Extraction - Iteration ${i + 1} of ${iterations}`);

		let accountPromises = [];
		for (const account of accounts.slice(skip, skip + accountsBatchSize)) {
			accountPromises.push(getAccountData(account, chainWs));
		}
		await Promise.all(accountPromises);
		skip = skip + accountsBatchSize;
	}
	console.log(`✅ Account scrapping done`);
};

const getAccountData = async (account: string, chainWs: Web3): Promise<I_Account> => {
	console.log(account);
	let accountData: I_Account = {
		address: account,
		balance: (await chainWs.eth.getBalance(account, block)).toString(),
		nonce: Number(await chainWs.eth.getTransactionCount(account, block)),
		block,
	};
	console.log('here');
	Account.updateOne(
		{ address: accountData.address }, //Filter
		accountData, //document
		{ upsert: true } //If document doesn't exist create it
	).catch((err) => {
		console.log(err);
	});

	const contractCode: I_Code = await getCode(account, chainWs);

	//Verify if the account is not a contract
	if (contractCode.code.length <= 2) {
		return;
	}

	//Contract code won't change so once it's stored
	//There's no need to update like accounts or storage
	if (await Code.countDocuments({ address: account })!) return;

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
