require('dotenv').config();

export const storageConcurrentLimit: number = 10000;
export const accountsBatchSize: number = 5000;
export const nftBatchSize: number = 2000;
export const endBlock: number = 14925651;
export const amountOfKeys: number = 29000;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;

export function date() {
	return `🕒 ${new Date().toTimeString().split(' ')[0]}`;
}
