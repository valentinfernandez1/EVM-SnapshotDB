import mongoose from "mongoose";

export interface I_Account {
	_id?: string;
	address: string;
	balance?: string;
	nonce?: number;
}

const AccountShema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	balance: {
		type: String,
		required: false,
	},
	nonce: {
		type: mongoose.Schema.Types.Number,
		required: false,
	},
});

export default mongoose.model("Account", AccountShema);
