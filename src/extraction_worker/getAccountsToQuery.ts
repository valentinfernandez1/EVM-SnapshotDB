import { BLOCK_HASH } from "../constants/utility";
import Account from "../models/Account";
import Tx, { I_Tx } from "../models/Tx";

const block = BLOCK_HASH;

export const getAccountsToQuery = async (): Promise<string[]> => {
    let accounts: string[] = [];

    //Filter accounts that are already in DB for this block.
    let storedAccounts: string[];
    try {
        await Account.deleteMany({block: { $ne: block }});

        let retrievedAccounts = await Account.find({}, "address -_id");
        storedAccounts = retrievedAccounts.map(account => {
            return account.address
        })
    } catch (error) {
        console.log(error);
        process.exit(0);
    }

    //Extract accounts from transactionDB
    const txs: I_Tx[] = await Tx.find({}, "from to contractDeployedAt");

    //Push to accounts array if its not in storedAccounts and its not repeated
    txs.forEach(tx => {
        storedAccounts.indexOf(tx.from) === -1 
            && accounts.indexOf(tx.from) === -1 
            && tx.from != null
            ? accounts.push(tx.from) : null;
        storedAccounts.indexOf(tx.to) === -1 
            && accounts.indexOf(tx.to) === -1 
            && tx.to != null
            ? accounts.push(tx.to) : null;
        storedAccounts.indexOf(tx.contractDeployedAt) === -1 
            && accounts.indexOf(tx.contractDeployedAt) === -1 
            && tx.contractDeployedAt 
            && tx.contractDeployedAt != null
            ? accounts.push(tx.contractDeployedAt) : null;
    });

    return accounts;
}

