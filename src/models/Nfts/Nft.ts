import mongoose, { Schema, Document } from 'mongoose';

const NftDataSchema: Schema = new Schema({
	tokenURI: { type: String },
	approval: { type: String },
});

const NftSchema: Schema = new Schema({
	id: { type: BigInt, required: true },
	collectionAddress: { type: String, required: true },
	owner: { type: String },
	data: { type: NftDataSchema },
});

export default mongoose.model('Nft', NftSchema);

export interface I_Nft {
	id: bigint;
	collectionAddress: string;
	owner?: string;
	data?: I_NftData;
}

export interface I_NftData {
	tokenURI?: string;
	approval?: string;
}
