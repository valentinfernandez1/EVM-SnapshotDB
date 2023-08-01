import { I_Storage, I_StorageState } from "models/Storage";
import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";
import Code, { I_Code } from "../models/Code";

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

//Extracting 2500 takes around 3,7s (This can be tweaked to optimized)
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
): Promise<I_Storage> => {
    let starting_key = "0x0000000000000000000000000000000000000000000000000000000000000000"
    from_key ? starting_key = from_key : null;

    let block = "latest"
    block_number ? block = block_number : null

    let response = await chainWs.send('debug_storageRangeAt', [
        block,
        0,
        contract,
        starting_key,
        amountOfKeys
    ]);

    let partial_storage = formatStorageData(response.storage);

    let nextHash = null;
    !response.complete ? nextHash = response.nextKey : null;

    let partialContractStorage: I_Storage = {
        address: contract,
        storageState: partial_storage,
        nextHash
    }

    return partialContractStorage
}

const formatStorageData = (raw_storage: any): I_StorageState[] => {
    let storageData: I_StorageState[] = []

    Object.keys(raw_storage).forEach(hash => {
        if (raw_storage[hash].key){
            storageData.push({
                key: raw_storage[hash].key, 
                value: raw_storage[hash].value
            });
        }
    });

    return storageData
}


export default { extractContractsStorage };