import Account, { I_Account } from "../models/Account";
import { chainWs, pageLimit } from "../constants/utility";
import Code, { I_Code } from "../models/Code";

export const extractAccounts = async (accounts: string[], block?: string) => {
    let skip = 0

    console.log(`👥 ${accounts.length} accounts to be scraped`);

    let iterations = Math.ceil(accounts.length / pageLimit);

    for (let i = 0; i < iterations; i++) {
        console.log(`🟡 Account Extraction - Iteration ${i + 1} of ${iterations}`)

        let accountPromises = [];
        for (const account of accounts.slice(skip, skip + pageLimit)) {
            accountPromises.push(getAccountData(account, block))
        }
        await Promise.all(accountPromises)
        skip = skip + pageLimit;

        console.log(`🔵 Account Extraction - Iteration ${i + 1} of ${iterations} done`)
    }
    console.log(`✅ Account scrapping done`);
}

const getAccountData = async (account: string, block?: string): Promise<I_Account> => {
    let accountData: I_Account = {
        address: account,
        balance: (await chainWs.getBalance(account, block)).toString(),
        nonce: await chainWs.getTransactionCount(account, block)
    }

    Account.updateOne(
        { address: accountData.address },   //Filter
        accountData,                        //document
        { upsert: true }                    //If document doesn't exist create it
    ).catch(err => {
        console.log(err)
    });

    const contractCode: I_Code = await getCode(account, block);

    //Verify if the account is not a contract
    if (contractCode.code.length <= 2) { return }

    //Contract code won't change so once it's stored
    //There's no need to update like accounts or storage
    if (await Code.countDocuments({ address: account })!) return;

    Code.create(contractCode).catch(err => {
        console.log(err)
    });
}

const getCode = async (account: string, block?: string): Promise<I_Code> => {
    let data: I_Code = {
        address: account,
        code: await chainWs.getCode(account, block)
    }

    return data
}