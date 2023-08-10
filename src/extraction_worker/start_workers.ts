import { extractAccounts } from './accountsData';
import { getAccountsToQuery } from './getAccountsToQuery';
import { extractStorages } from './contractStorage';
import { getAccountsFromBE } from './getAccountsFromBE';

require('dotenv').config();

export const start_extraction_workers = async () => {
	getAccountsFromBE();
	/* let accounts: string[] = await getAccountsToQuery();
	await extractAccounts(accounts);
	extractStorages(); */
};
