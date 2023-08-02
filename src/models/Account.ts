import mongoose from "mongoose";

export interface I_Account {
	_id?: string;
	address: string;
	balance: string;
	nonce: number;
}

const AccountShema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	balance: {
		type: String,
		required: true,
	},
	nonce: {
		type: mongoose.Schema.Types.Number,
		required: true,
	},
});

export default mongoose.model("Account", AccountShema);
