import Web3 from 'web3';
import WebSocketProvider from 'web3-providers-ws';
import WebSocket from 'ws';
require("dotenv").config();

export const storageConcurrentLimit: number = 1500;
export const accountsBatchSize: number = 3000;
export const amountOfKeys: number = 14500 ;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;

const customWsProvider = new WebSocketProvider('wss://p-reader.mythical.engineering/ws', {
  headers: {
    'X-API-Key': process.env.BESU_API_KEY,
  },
  timeout: 60000,
})

export const chainWs = new Web3(customWsProvider);;
