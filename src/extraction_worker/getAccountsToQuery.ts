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
	const addresses: string[] = await Address.distinct('address').lean();

	//Push to accounts array if its not in storedAccounts and its not repeated
	let accounts: string[] = addresses.filter(
		(address) => storedAccounts.indexOf(address) === -1 && address != null
	);

	return accounts;
};
