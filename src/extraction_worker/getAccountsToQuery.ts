import Code from '../models/Code';
import { BLOCK_HASH } from '../constants/utility';
import Account from '../models/Account';
import Address, { I_Address } from '../models/Address';
import { getAccountsFromBE } from './getAccountsFromBE';

const block = BLOCK_HASH;

export const getAccountsToQuery = async (): Promise<string[]> => {
	//Filter accounts that are already in DB for this block.
	let storedAccounts: string[];
	try {
		await Account.deleteMany({ block: { $ne: block } });
		await Code.deleteMany({ block: { $ne: block } });

		let retrievedAccounts = await Account.find({}, 'address -_id');
		storedAccounts = retrievedAccounts.map((account) => {
			return account.address;
		});
	} catch (error) {
		console.log(error);
		process.exit(0);
	}

	//Push to accounts array if its not in storedAccounts and its not repeated
	let accounts: string[] = [];

	//Extract accounts from transactionDB
	const addresses: I_Address[] = await Address.find(
		{ address: { $ne: null } },
		'address -_id'
	).lean();

	console.log('🔎 Filtering already stored accounts');
	addresses.forEach((address, index) => {
		storedAccounts.indexOf(address.address) === -1 ? accounts.push(address.address) : null;
	});

	/* //Extract accounts from BlockExplorer
	const addresses: string[] = await getAccountsFromBE();

	console.log('🔎 Filtering already stored accounts');
	addresses.forEach((address) => {
		storedAccounts.indexOf(address) === -1 && address != null ? accounts.push(address) : null;
	}); */

	return accounts;
};

let comparer = async (address) => {};
