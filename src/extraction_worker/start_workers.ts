import { accounts, contracts } from "../constants/testAccounts";
import { extractAccounts } from "./accountsData";
import { extractContractsCode } from "./contractCode";
import { extractStorages } from "./contractStorage";

/*
Given a set of accounts and contract it initialized
the extraction of the data from the chaim

Right now this values are manually sent to this functions
but ideally this has to be also extracted from on chain 
data 
*/
export const start_extraction_workers = () => {
    extractAccounts(accounts);
	extractContractsCode(contracts).then(() => {
        extractStorages()
    })
}