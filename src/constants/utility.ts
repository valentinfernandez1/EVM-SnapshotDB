require('dotenv').config();

export const storageConcurrentLimit: number = 10000;
export const accountsBatchSize: number = 1000;
export const nftBatchSize: number = 2000;
export const endBlock: number = 14925651;
export const amountOfKeys: number = 29000;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;
export const RPC_EVENT_BLOCK_RANGE = 5000;
