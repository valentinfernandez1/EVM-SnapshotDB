import Tx, { I_Tx } from "../models/Tx";

export const getAccountsFromHistory = async (): Promise<string[]> => {
    let accounts: string[] = [];
    const txs: I_Tx[] = await Tx.find({}, "from to contractDeployedAt");

    //Extract from object an insert if unique
    txs.forEach(tx => {
        accounts.indexOf(tx.from) === -1 ? accounts.push(tx.from) : null;
        accounts.indexOf(tx.to) === -1 ? accounts.push(tx.to) : null;
        accounts.indexOf(tx.contractDeployedAt) === -1 && tx.contractDeployedAt? accounts.push(tx.contractDeployedAt) : null;
    });
    
    return accounts;
}

