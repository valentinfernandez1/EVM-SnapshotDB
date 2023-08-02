import WebSocket from 'ws';
import { WebSocketProvider } from 'ethers';
require("dotenv").config();

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

export const pageLimit: number = 20;

//Extracting 2500 takes around 3,7s (This can be tweaked to optimized)
export const amountOfKeys: number = 7500;
