import { SetInterval } from './other';
export default class WebSocketClient extends WebSocket {
	public heartbeatInterval: number = 30000;
	private heartbeatTimeoutId: number| null = null;
	private mySetInterval: SetInterval = new SetInterval();

	constructor(url: string, protocols?: string | string[]) {
		super(url, protocols);
		this.startHeartbeat();
	}

	private startHeartbeat() {
		if (this.heartbeatTimeoutId) {
			clearTimeout(this.heartbeatTimeoutId);
		}

		this.mySetInterval.start(() => {
			if (this.readyState === this.OPEN) {
				this.send(
					JSON.stringify({
						message: {
							type: 'heartbeat'
						}
					})
				);
			}
		}, this.heartbeatInterval);
	}

	close(code?: number, reason?: string) {
		this.mySetInterval.clear();
		console.log('WebSocketClient close');
		super.close(code, reason);
	}
}
