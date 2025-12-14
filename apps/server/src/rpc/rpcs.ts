import { createRpcRegistry } from "./registry.js";
import { join_match, create_match, list_matches } from "./matches.js";
import { subscribe_to_lobby } from "../lobby/lobby.js";
import { hello } from "./hello.js";

const rpc = createRpcRegistry()
  .define("join_match", join_match)
  .define("create_match", create_match)
  .define("list_matches", list_matches)
  .define("subscribe_to_lobby", subscribe_to_lobby)
  .define("hello", hello);

export const rpcs = rpc.registry;
export const callRpc = (...args: Parameters<typeof rpc.call>) => rpc.call(...args);
export const defineRpc = (...args: Parameters<typeof rpc.define>) =>
  rpc.define(...args);
