import RPC, { RPCContext } from "./rpcTypes.js";
import { WebSocket } from "ws";
import rpcs from "./rpcList.js";

export default function rpcHandler(ws: WebSocket, rpc: RPC) {
  if (!(rpc.method in rpcs)) {
    throw new Error(`Unknown RPC method: ${rpc.method}`);
  }

  const handler = rpcs[rpc.method];
  const ctx: RPCContext = { ws, client_id: rpc.client_id };
  const params = [ctx, ...rpc.args] as Parameters<typeof handler>;

  // @ts-expect-error dynamic call
  return handler(...params);
}
