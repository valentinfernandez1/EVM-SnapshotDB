import { I_ContractStorage, I_StorageState } from "models/ContractStorage";
import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";
import Contract, { I_Contract } from "../models/Contract";

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

//Extracting 2500 takes around 0,5s (This can be tweaked to optimezed)
const amountOfKeys = 2500

const extractContractsStorage = async () => {
    let failed: string[] = []


}

//Obtain a certain amount of keys from a contract Storage starting from a storage key 
const getPartialStorage = async (
    contract: string,
    amountOfKeys: number,   //Amount to retrieve from the chain
    from_key?: string,      //If null it starts from the first key in storage
    block_number?: string
): Promise<I_ContractStorage> => {
    let starting_key = "0x0000000000000000000000000000000000000000000000000000000000000000"
    from_key ? starting_key = from_key : null;

    let block = "latest"
    block_number ? block = block_number : null

    let raw_storage = (await chainWs.send('debug_storageRangeAt', [
        block,
        0,
        contract,
        starting_key,
        amountOfKeys
    ])).result;

    console.log(raw_storage);

    let partial_storage = formatStorageData(raw_storage.storage);

    let nextHash = null;
    !raw_storage.complete ? nextHash = raw_storage.nextKey : null;

    let partialContractStorage: I_ContractStorage = {
        address: contract,
        storage: partial_storage,
        nextHash
    }

    return partialContractStorage
}

const formatStorageData = (raw_storage: any): I_StorageState[] => {
    let data: I_StorageState[] = []



    return data
}

export default { extractContractsStorage };