import mongoose from "mongoose";

export interface I_ContractStorage {
    _id?: string;
    address: string;
    storage: I_StorageState[];
    // If the storage load fails it can be restarted from the last queried key
    nextHash?: string
}

export interface I_StorageState {
    _id?: string;
    key: string;
    value: string;
}

const ContractStorageSchema = new mongoose.Schema({
    //Could probably be linked to the contract schema
    //But less keep it simple, plus we dont really care about
    //data redundancie here
    address: {
        type: String,
        required: true,
    },
    storage: [
        {
            key: {
                type: String,
                required: true,
            },
            value: {
                type: String,
                required: true,
            }
        }
    ],
    nextHash: {
        type: String,
        // If the storage was fully queried this will
        // be null meaning that it is complete
        required: false,
    }
});

export default mongoose.model("ContractStorage", ContractStorageSchema);
