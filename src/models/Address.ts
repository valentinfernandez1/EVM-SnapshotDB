import mongoose from 'mongoose';

export interface I_Address {
	address: string;
	_id?: string;
}

const AddressSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			required: true,
		},
	},
	{ collection: 'accounts' }
);

export default mongoose.model('Address', AddressSchema);
