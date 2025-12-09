import { WebSocket } from "ws";
import { rpcs } from "./rpcHandler.js";

export type RPCContext = {
  ws: WebSocket;
  client_id: number;
};

type RemoveContext<T extends unknown[]> = T extends [RPCContext, ...infer Rest]
  ? Rest
  : T;

type MethodMap = {
  [K in keyof typeof rpcs]: {
    args: RemoveContext<Parameters<(typeof rpcs)[K]>>;
    result: ReturnType<(typeof rpcs)[K]>;
  };
};

export type RPC<M extends keyof MethodMap = keyof MethodMap> = {
  client_id: number;
  req_id: number;
  method: M;
  args: MethodMap[M]["args"];
};

export type RPCResponse<M extends keyof MethodMap = keyof MethodMap> = {
  req_id: number;
  method: M;
} & ({ result: MethodMap[M]["result"] } | { error: unknown });

export default RPC;
