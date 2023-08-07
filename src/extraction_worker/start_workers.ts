//import { accounts } from "../constants/testAccounts";
import { BLOCK_HASH } from "../constants/utility";
import { extractAccounts } from "./accountsData";
import { getAccountsToQuery } from "./getAccountsToQuery";
import { extractStorages } from "./contractStorage";

require('dotenv').config();

export const start_extraction_workers = async () => {
    let accounts: string[] = await getAccountsToQuery();
    await extractAccounts(accounts);
    //TODO: Filter completed for block and improve queue process
	extractStorages(); 
}