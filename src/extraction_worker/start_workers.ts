//import { accounts } from "../constants/testAccounts";
import { extractAccounts } from "./accountsData";
import { getAccountsFromHistory } from "./accountsFromHistory";
import { extractStorages } from "./contractStorage";

require('dotenv').config();
/*
Given a set of accounts and contract it initialized
the extraction of the data from the chaim

Right now this values are manually sent to this functions
but ideally this has to be also extracted from on chain 
data 
*/

const block = process.env.BLOCK_HASH;

export const start_extraction_workers = async () => {
    let accounts: string[] = await getAccountsFromHistory();
    await extractAccounts(accounts, block);
	//extractStorages(block);
}