import { BLOCK_HASH } from '../constants/utility';
import Account from '../models/Account';
import Address, { I_Address } from '../models/Address';

const block = BLOCK_HASH;

export const getAccountsToQuery = async (): Promise<string[]> => {
	//Filter accounts that are already in DB for this block.
	let storedAccounts: string[];
	try {
		await Account.deleteMany({ block: { $ne: block } });

		let retrievedAccounts = await Account.find({}, 'address -_id');
		storedAccounts = retrievedAccounts.map((account) => {
			return account.address;
		});
	} catch (error) {
		console.log(error);
		process.exit(0);
	}

	//Extract accounts from transactionDB
	const addresses: I_Address[] = await Address.find({}, 'address -_id').lean();

	console.log('🔎 Filtering already stored accounts');
	//Push to accounts array if its not in storedAccounts and its not repeated
	let accounts: string[] = [];

	addresses.forEach((address) => {
		storedAccounts.indexOf(address.address) === -1 && address.address != null
			? accounts.push(address.address)
			: null;
	});

	return accounts;
};
