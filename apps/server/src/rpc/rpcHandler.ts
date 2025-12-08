import RPC from "./rpcTypes.js";
import matchRpcs from "./matches.js";
import lobbyRpcs from "../lobby/lobby.js";

export const rpcs = { ...matchRpcs, ...lobbyRpcs };

export default function rpcHandler(rpc: RPC) {
  const handler = rpcs[rpc.method];
  if (!handler) {
    throw new Error(`Unknown RPC method: ${rpc.method}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  return (handler as any)(...rpc.args) as ReturnType<typeof handler>;
}
