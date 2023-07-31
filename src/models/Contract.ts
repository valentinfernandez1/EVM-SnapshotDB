import mongoose from "mongoose";

export interface I_Contract {
	_id?: string;
	address: string;
	code: string;
}

const ContractShema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Contract", ContractShema);
