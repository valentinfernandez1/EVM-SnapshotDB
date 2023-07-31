import Account, { I_Account } from "../models/Account";
import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";

const accounts: string[] = [
    "0xE1683D0C4522C54D0CfDE49DE7d8da0814F926a1",
    "0x5e2157a078D15821dafb0D53aa8b08CBD31bdD65",
    "0xA47be58Bf51280A7E5e5525E7F31d2A72064d82c"
]

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

const extractAccounts = async (accounts: string[]) => {
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
        balance: await chainWs.getBalance(account, block),
        nonce: await chainWs.getTransactionCount(account, block)
    }

    return data;
}
export default { extractAccounts, accounts };