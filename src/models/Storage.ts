import mongoose from "mongoose";

export interface I_Storage {
    _id?: string;
    address: string;
    storageState: I_StorageState[];
    nextHash?: string,
    //Allow to check if the state was fully queried or there was an error
    complete?: boolean
    //If document has reached limit size
    full?: boolean
    block?: string
}

export interface I_StorageState {
    _id?: string;
    key: string;
    value: string;
}

const StorageSchema = new mongoose.Schema({
    address: { type: String, required: true },
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
    complete: { type: Boolean, default: false },
    full: { type: Boolean, default: false },
    block: {
        type: String,
        required: true
    }
});

export default mongoose.model("Storage", StorageSchema);
