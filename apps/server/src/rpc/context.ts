import { WebSocket } from "ws";

export type RPCContext = {
  ws: WebSocket;
  client_id: number;
};
