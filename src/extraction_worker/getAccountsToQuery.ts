import { BLOCK_HASH } from "../constants/utility";
import Account from "../models/Account";
import Address, { I_Address } from "../models/Address"

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
    const addresses: I_Address[] = await Address.find({}, "address").lean();

    //Push to accounts array if its not in storedAccounts and its not repeated
    addresses.forEach(addr => {
        storedAccounts.indexOf(addr.address) === -1 && addr.address != null ? accounts.push(addr.address) : null;
    });

    return accounts;
}

