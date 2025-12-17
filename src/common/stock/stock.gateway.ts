import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

interface ConnectionArgs {
    url?: string;
}

@WebSocketGateway()
export class StockGateway {
    private clients = new Map<string, WebSocket>();

    @WebSocketServer()
    server: Server;

    _getToken(args: ConnectionArgs) {
        const requestUrl = args?.url || '';
        const urlParams = new URLSearchParams(requestUrl.split('?')[1]);
        return urlParams.get('token');
    }

    handleConnection(client: WebSocket, args?: ConnectionArgs) {
        const token = this._getToken(args ?? {});
        console.log('token', token);
        client.send('Welcome to the WebSocket server!');
    }

    handleDisconnect() {
        console.log('Client disconnected');
    }

    @SubscribeMessage('message')
    handleMessage(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() payload: string,
    ): void {
        client.send(`Broadcast: ${payload}`);
    }
}
