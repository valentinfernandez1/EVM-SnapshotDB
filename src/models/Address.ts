import mongoose from "mongoose";

export interface I_Address {
    address: string,
    _id?: string
}

const AddressSchema = new mongoose.Schema({
	from: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	contractDeployedAt: {
		type: String,
		required: false,
	},
}, {collection: 'accounts'});

export default mongoose.model("Address", AddressSchema);
