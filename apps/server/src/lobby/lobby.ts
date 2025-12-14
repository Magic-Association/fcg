import { RPCContext } from "../rpc/context.js";
import { makeRoom, Room } from "../rooms.js";

// Clients in lobby will receive updates about available matches
export const lobby: Room = makeRoom();

export function subscribe_to_lobby(ctx: RPCContext) {
  if (lobby.players.includes(ctx.client_id)) {
    throw new Error("Client is already in the lobby");
  }
  lobby.players.push(ctx.client_id);
}

const lobbyRpcs = { subscribe_to_lobby };
export default lobbyRpcs;
