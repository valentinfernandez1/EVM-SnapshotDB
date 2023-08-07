import Storage, { I_Storage, I_StorageState } from "../models/Storage";
import Code, { I_Code } from "../models/Code";
import { BLOCK_HASH, amountOfKeys, chainWs, storageConcurrentLimit } from "../constants/utility";

const timeout = 2000;
const block = BLOCK_HASH;

export const extractStorages = async () => {
    console.log("🔎 Filtering already stored Storage contracts")
    let contracts: string[] = await getContractsToScrape();
    console.log(`📦 ${contracts.length} contract storages to be scraped`);
    
    let ongoingPromises = 0 
    let storagePromises = [];
    while(contracts.length > 0){
        for (ongoingPromises; ongoingPromises < storageConcurrentLimit; ongoingPromises++) {
            let contractAddress = contracts.pop()
            
            if (contractAddress == null) continue;
            storagePromises.push(
                getContractStorage(contractAddress).then(() => {
                    ongoingPromises -= 1;
                })
            )
        }
        
        await new Promise((resolve) => setTimeout(resolve, Number(timeout)));
    }

    await Promise.all(storagePromises)

    console.log("✅ Storage scrapping finished")
}

const getContractsToScrape = async (): Promise<string[]>  => {
    //Get contract list
    let contracts: string[] = (await Code.find({}, "address -_id")).map(contract => {
        return contract.address
    });
    //Get already stored Storages for this block
    let storages: string[] = (await Storage.find({block: { $eq: block }, complete: true}, "address -_id")).map(storage => {
        return storage.address
    });

    contracts = contracts.filter(contract => {
        return storages.indexOf(contract) === -1
    })

    return contracts;
}

const getContractStorage = async (contract: string) => {
    let exit = false;
    let created = false;
    let nextHash = null;

    while (!exit) {
        let partial: I_Storage = await getPartialStorage(contract, amountOfKeys, nextHash);

        //If no nextHash the contract query is complete 
        if (!partial.nextHash) {
            exit = true
            partial.complete = true
        };

        nextHash = partial.nextHash

        //If this is the first iteration delete just in case it has old data
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
    from_key?: string      //If null it starts from the first key in storage
): Promise<I_Storage> => {
    let starting_key = "0x0000000000000000000000000000000000000000000000000000000000000000"
    from_key ? starting_key = from_key : null;
    
    let response = await chainWs.send('debug_storageRangeAt', [
        block,
        0,
        contract,
        starting_key,
        amountOfKeys
    ]);

    console.log(`🕒 ${contract} - ${(new Date()).toTimeString().split(' ')[0]}` )
    let partial_storage = formatStorageData(response.storage);

    let nextHash = null;
    !response.complete ? nextHash = response.nextKey : null;

    let partialContractStorage: I_Storage = {
        address: contract,
        storageState: partial_storage,
        nextHash,
        complete: response.complete,
        block
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
        block: partialStorage.block
    })
}