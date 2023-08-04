import Storage, { I_Storage, I_StorageState } from "../models/Storage";
import Code, { I_Code } from "../models/Code";
import { amountOfKeys, chainWs, storageBatchSize } from "../constants/utility";

//TODO: Add blocknumber to query
//If this takes longer than the block time 
//It will be pulling the state from different storages
export const extractStorages = async (block?: string) => {
    chainWs.on('error', (err) => {
        console.log('ws error ',err)
    })

    let failed: string[] = []
    let skip = 0

    //Get amount of contracts
    let contractAmount: number = await Code.countDocuments();
    console.log(`📦 ${contractAmount} contract storages to be scraped`);
    storageBatchSize
    let iterations = Math.ceil(contractAmount / storageBatchSize);
    for (let i = 0; i < iterations; i++) {
        console.log(`🟡 Iteration ${i + 1} of ${iterations} started`)
        //Get contract addresses
        let contracts: I_Code[] = await Code.find(
            {},
            "address -_id",
            { skip: skip, limit: storageBatchSize }
        );

        let storagePromises = [];
        for (const contract of contracts) {
            storagePromises.push(getContractStorage(contract.address, block))
        }
        await Promise.all(storagePromises)
        skip = skip + storageBatchSize;

        console.log(`🔵 Iteration ${i + 1} of ${iterations} done`)
    }

    console.log("✅ Storage scrapping finished")
}

const getContractStorage = async (contract: string, block?: string) => {
    let exit = false;
    let created = false;
    let nextHash = null;

    while (!exit) {
        let partial: I_Storage = await getPartialStorage(contract, amountOfKeys, nextHash, block);

        //If no nextHash the contract query is complete 
        if (!partial.nextHash) {
            exit = true
            partial.complete = true
        };

        nextHash = partial.nextHash

        //If this is the first iteration delete just in case and create model
        if (!created) {
            await Storage.deleteMany({ address: contract });
            await Storage.create(partial)
            created = true;
        } else {
            try {
                await Storage.findOneAndUpdate(
                    { address: contract, full: false },
                    { $push: { storageState: partial.storageState } }
                )

                //Set all the associated storages as completed for this contract
                partial.complete ? await Storage.updateMany({ address: contract }, { $set: { complete: true } }) : null;
            } catch (error) {
                if (error.codeName != "BSONObjectTooLarge") {
                    console.log(error);
                    process.exit()
                }

                await handleStorageOverflow(partial)
            }
        }
    }

    console.log(`💯 Succesfully stored contract ${contract}`)
}

//Obtain a certain amount of keys from a contract Storage starting from a storage key 
const getPartialStorage = async (
    contract: string,
    amountOfKeys: number,   //Amount to retrieve from the chain
    from_key?: string,      //If null it starts from the first key in storage
    block?: string
): Promise<I_Storage> => {
    let starting_key = "0x0000000000000000000000000000000000000000000000000000000000000000"
    from_key ? starting_key = from_key : null;

    let blockHash = "latest"
    block ? blockHash = block : null

    
    let response = await chainWs.send('debug_storageRangeAt', [
        blockHash,
        0,
        contract,
        starting_key,
        amountOfKeys
    ]);

    console.log(`${contract} - ${(new Date()).toTimeString().split(' ')[0]}` )
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

const handleStorageOverflow = async (partialStorage: I_Storage) => {
    //Mark the current storage document as full
    await Storage.findOneAndUpdate(
        { address: partialStorage.address, full: false },
        { $set: { full: true } }
    )

    //Create new storage document for contract
    //and include the partial state
    await Storage.create({
        address: partialStorage.address,
        storageState: partialStorage.storageState,
    })
}