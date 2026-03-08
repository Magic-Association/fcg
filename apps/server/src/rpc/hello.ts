import { WebSocket } from "ws";
import { RPCContext } from "./rpcTypes.js";
import { subscribe_to_lobby } from "../lobby/lobby.js";
import { list_matches } from "./matches.js";

// client_id -> WebSocket
const connectionMap = new Map<number, WebSocket>();

export function hello(ctx: RPCContext) {
  connectionMap.set(ctx.client_id, ctx.ws);
  subscribe_to_lobby(ctx);
  return list_matches(ctx);
}

export default connectionMap;
