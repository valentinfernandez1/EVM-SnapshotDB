import mongoose from "mongoose";

export interface I_Account {
	_id?: string;
	address: string;
	balance: bigint;
	nonce: number;
}

const AccountShema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	balance: {
		type: BigInt,
		required: true,
	},
	nonce: {
		type: mongoose.Schema.Types.Number,
		required: true,
	},
});

export default mongoose.model("Account", AccountShema);
