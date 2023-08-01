import mongoose from "mongoose";

export interface I_Storage {
    _id?: string;
    address: string;
    storageState: I_StorageState[];
    nextHash?: string,
    //Allow to check if the state was fully queried or there was an error
    complete?: boolean
}

export interface I_StorageState {
    _id?: string;
    key: string;
    value: string;
}

const StorageSchema = new mongoose.Schema({
    //Could probably be linked to the contract schema
    //But less keep it simple, plus we dont really care about
    //data redundancy here
    address: {
        type: String,
        required: true,
    },
    storageState: [
        {
            key: {
                type: String,
                required: false,
            },
            value: {
                type: String,
                required: true,
            }
        }
    ],
    complete: {
        type: Boolean,
        defaul: false,
    }
});

export default mongoose.model("Storage", StorageSchema);
