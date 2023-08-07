import WebSocket from 'ws';
import { WebSocketProvider } from 'ethers';
require("dotenv").config();

export const storageConcurrentLimit: number = 75;
export const accountsBatchSize: number = 150;
export const amountOfKeys: number = 72500;
export const BLOCK_HASH: string = process.env.BLOCK_HASH;

export class CustomWebSocketProvider extends WebSocketProvider {
	constructor(url, apiKey) {
		const headers = {
			'X-API-Key': apiKey,
		};
		const options = {
			headers: headers,
		};
		const webSocket = new WebSocket(url, options);
		
		super(webSocket);
	}
}

export const chainWs = new CustomWebSocketProvider(process.env.RPC_WS_URL, process.env.BESU_API_KEY);
