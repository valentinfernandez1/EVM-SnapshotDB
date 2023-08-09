import { extractAccounts } from './accountsData';
import { getAccountsToQuery } from './getAccountsToQuery';
import { extractStorages } from './contractStorage';

require('dotenv').config();

export const start_extraction_workers = async () => {
	let accounts: string[] = await getAccountsToQuery();
	await extractAccounts(accounts);
	extractStorages();
};
