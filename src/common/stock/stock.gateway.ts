import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, WebSocket } from "ws";

@WebSocketGateway({
    cors: { origin: "*" },
})
export class SocketGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private clients = new Set<WebSocket>();
    private room = new Map<string, Set<WebSocket>>();

    private _getToken(args: any) {
        const RequestUrl = args?.url ?? "";
        const urlParams = new URLSearchParams(RequestUrl.split("?")[1]);
        return urlParams.get("token");
    }

    @WebSocketServer()
    server: Server;

    handleConnection(client: WebSocket, args: any) {
        const token = this._getToken(args) ?? '';
        // if(!this.validateToken(token)) client.close()
        this.clients.add(client);
    }

    private validateToken(token: string): boolean {
        // Encrypt Token to Validate User
        console.log(token)
        return Boolean(token);
    }

    private send(response: any) {
        this.clients.forEach((client) => {
            client.send(JSON.stringify(this.formatData(response)));
        });
    }

    private formatData(data: any, t = "action") {
        return {
            ok: 1,
            t: t,
            d: data,
            e: null,
        };
    }

    @SubscribeMessage("event")
    handleChatMessage(
        @ConnectedSocket() client: WebSocket,
        @MessageBody() data: any
    ) {
        try {
            const response = "Get Data Form Event";
            this.send(response);
        } catch (error) {
            const ErrorResponse = {
                ok: 0,
                t: "",
                d: null,
                e: error?.message ?? error,
            };
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(ErrorResponse));
            }
        }
    }

    @SubscribeMessage("ping")
    ping(@ConnectedSocket() client: WebSocket) {
        return client.send(JSON.stringify(this.formatData("pong")));
    }

    handleDisconnect(client: WebSocket) {
        console.log("Client Disconnect" + this.clients.delete(client));
    }
    afterInit(server: any) {
        console.log("Websocket Server Init");
    }
}