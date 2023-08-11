require('dotenv').config();

export const storageConcurrentLimit: number = 1500;
export const accountsBatchSize: number = 5000;
export const amountOfKeys: number = 14500;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;
