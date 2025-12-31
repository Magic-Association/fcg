import { WebSocket } from "ws";
import RPC from "./rpcTypes.js";
import { RPCContext } from "./context.js";
import { rpcs } from "./rpcs.js";

export default function rpcHandler(ws: WebSocket, rpcMessage: RPC) {
  const handler = rpcs[rpcMessage.method];
  if (!handler) {
    throw new Error(`Unknown RPC method: ${rpcMessage.method}`);
  }

  const ctx: RPCContext = { client_id: rpcMessage.client_id, ws };
  // rpcMessage.args already are validated by the type derived from rpcs
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return handler(ctx, ...rpcMessage.args);
}
