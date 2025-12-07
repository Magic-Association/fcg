import { RPCContext } from "./types/RPC.js";

export type Room = {
  name?: string;
  players: number[];
  createdAt: Date;
};

export function makeRoom(data: Omit<Room, "createdAt">): Room {
  return { ...data, createdAt: new Date() };
}

export const exampleMatches = new Map<number, Room>(
  Array.from({ length: 20 }, (_, i) => [
    i,
    makeRoom({ name: `Match ${i + 1}`, players: [] }),
  ]),
);

// Clients in lobby will receive updates about available matches
export const lobby: Room = makeRoom({ players: [] });

function subscribe_to_lobby(ctx: RPCContext) {
  if (lobby.players.includes(ctx.client_id)) {
    throw new Error("Client is already in the lobby");
  }
  lobby.players.push(ctx.client_id);
}

const roomRpcs = { subscribe_to_lobby };

export default roomRpcs;
