import mongoose from "mongoose";

export interface I_Tx {
    from: string,
    to: string,
    contractDeployedAt?: string
}

const TxSchema = new mongoose.Schema({
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
}, {collection: 'txes'});

export default mongoose.model("Tx", TxSchema);
