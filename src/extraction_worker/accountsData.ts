import Account, { I_Account } from "../models/Account";
import { chainWs } from "../constants/utility";

export const extractAccounts = async (accounts: string[]) => {
    let failed: string[] = [];

    //TODO: Improve parallelism of requests to the DB
    for await (const account of accounts) {
        let accountData: I_Account = await getAccountData(account);

        Account.updateOne(
            { address: accountData.address },  //Filter
            accountData,                     //document
            { upsert: true }                   //If document doesn't exist create it
        ).catch(err => {
            failed.push(accountData.address)
        });
    }

    console.log(`✅ Account scrapping done`);
    failed.length ? console.log(`Failed to update ${failed} accounts`) : null;
}

const getAccountData = async (account: string, block?: number): Promise<I_Account> => {
    let data: I_Account = {
        address: account,
        balance: (await chainWs.getBalance(account, block)).toString(),
        nonce: await chainWs.getTransactionCount(account, block)
    }

    return data;
}
