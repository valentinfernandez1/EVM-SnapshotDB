import mongoose from 'mongoose';

export interface I_Code {
	_id?: string;
	address: string;
	code?: string;
}

const CodeShema = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Code', CodeShema);
