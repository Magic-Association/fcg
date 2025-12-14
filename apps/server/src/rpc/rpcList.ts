import { RPCContext } from "./rpcTypes.js";
import matchRpcs from "./matches.js";
import lobbyRpcs from "../lobby/lobby.js";
import hello from "./hello.js";

// Add new RPC methods here
const rpcs = { ...matchRpcs, ...lobbyRpcs, hello };
export default rpcs;

// The following ensures the first parameter of each RPC is RPCContext
rpcs satisfies RPCList<typeof rpcs>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RPCHandler<T> = T extends () => any
  ? never
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends (ctx: RPCContext, ...args: any[]) => any
    ? T
    : never;
type RPCList<T> = {
  [K in keyof T]: RPCHandler<T[K]>;
};
