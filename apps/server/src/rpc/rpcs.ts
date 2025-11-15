import matches from "../rpc/matches";
import rooms from "../rooms";
import RPC from "../types/RPC";

export const rpcs = { ...matches, ...rooms };

export default function rpcHandler(rpc: RPC) {
  const handler = rpcs[rpc.method];
  if (!handler) {
    throw new Error(`Unknown RPC method: ${rpc.method}`);
  }
  return (handler as any)(...rpc.args) as ReturnType<typeof handler>;
}
