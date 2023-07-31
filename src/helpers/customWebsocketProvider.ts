import WebSocket from 'ws';
import { WebSocketProvider } from 'ethers';

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