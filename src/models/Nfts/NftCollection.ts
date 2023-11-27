import mongoose, { Schema, Document } from 'mongoose';

const NftCollectionDataSchema: Schema = new Schema({
	name: { type: String },
	symbol: { type: String },
	minter: { type: String },
});

const NftCollectionSchema: Schema = new Schema(
	{
		address: { type: String, required: true },
		type: { type: String, enum: ['Saga721', 'DMarket721'], required: true },
		data: { type: NftCollectionDataSchema },
	},
	{ collection: 'nftCollections' }
);

export default mongoose.model('NftCollection', NftCollectionSchema);

export interface I_NftCollection {
	address: string;
	type: string;
	data?: I_NftCollectionData;
}

export interface I_NftCollectionData {
	name?: string;
	symbol?: string;
	minter?: string;
}
