import matches from "../rpc/matches.js";
import rooms from "../rooms.js";
import RPC from "../types/RPC.js";

export const rpcs = { ...matches, ...rooms };

export default function rpcHandler(rpc: RPC) {
  const handler = rpcs[rpc.method];
  if (!handler) {
    throw new Error(`Unknown RPC method: ${rpc.method}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  return (handler as any)(...rpc.args) as ReturnType<typeof handler>;
}
