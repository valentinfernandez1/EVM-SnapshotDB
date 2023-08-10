import Web3 from 'web3';
import WebSocketProvider from 'web3-providers-ws';
import WebSocket from 'ws';
require('dotenv').config();

export const storageConcurrentLimit: number = 1500;
export const accountsBatchSize: number = 1;
export const amountOfKeys: number = 14500;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;
