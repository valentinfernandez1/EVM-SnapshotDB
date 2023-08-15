require('dotenv').config();

export const storageConcurrentLimit: number = 10000;
export const accountsBatchSize: number = 5000;
export const amountOfKeys: number = 29000;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;
