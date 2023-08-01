import Storage, { I_Storage, I_StorageState } from "../models/Storage";
import { CustomWebSocketProvider } from "../helpers/customWebsocketProvider";
import Code, { I_Code } from "../models/Code";

const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);

const pageLimit = 3

const extractStorages = async () => {
    let failed: string[] = []
    let skip = 0

    //Get amount of contracts
    let contractAmount: number = await Code.countDocuments();
    console.log(`📦 ${contractAmount} contract storages to be scraped`);

    let iterations = Math.ceil(contractAmount/pageLimit);
    for (let i = 0; i < iterations; i++){
        console.log(`🟡 Iteration ${i+1} of ${iterations} started`)
        //Get contract addresses
        let contracts: I_Code[] = await Code.find(
            {}, 
            "address -_id", 
            { skip: skip, limit: pageLimit }
        );

        let storagePromises = [];
        for (const contract of contracts) {
            storagePromises.push(getContractStorage(contract.address))
        }
        await Promise.all(storagePromises)
        skip = skip + pageLimit;

        console.log(`🔵 Iteration ${i+1} of ${iterations} done`)
    }
   
    console.log("Finished")
}

//Extracting 2500 takes around 3,7s (This can be tweaked to optimized)
const amountOfKeys = 7500;

const getContractStorage = async (contract: string) => {
    let exit = false;
    let created = false;
    let nextHash = null;

    while(!exit){
        let partial = await getPartialStorage(contract, amountOfKeys, nextHash);

        //If no nextHash the contract query is complete 
        if(!partial.nextHash){
            exit = true
            partial.complete = true
        };

        nextHash = partial.nextHash

        //If this is the first iteration delete just in case and create model
        if(!created){
            await Storage.deleteOne({address: contract});
            await Storage.create(partial)
            created = true;
        }else{
            await Storage.findOneAndUpdate(
                { address: contract },
                { $push: { storageState: partial.storageState }, $set: {complete: partial.complete} }
            )
        }
    }

    console.log(`💯 Succesfully stored contract ${contract.slice(0,5)}..${contract.slice(38,41)}`)
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
        nextHash,
        complete: response.complete
    }

    return partialContractStorage
}

const formatStorageData = (raw_storage: any): I_StorageState[] => {
    let storageData: I_StorageState[] = []

    Object.keys(raw_storage).forEach(hash => {
        storageData.push({
            key: raw_storage[hash].key,
            value: raw_storage[hash].value
        });
    });

    return storageData
}


export default { extractStorages };