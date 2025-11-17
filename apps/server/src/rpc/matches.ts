import { RPCContext } from "../types/RPC.js";

import { Room, exampleMatches, makeRoom } from "../rooms.js";

const matches = new Map<number, Room>([...exampleMatches]);

let lastMatchRoomId = 1;

function create_match(ctx: RPCContext) {
  const matchId = lastMatchRoomId++;
  const match: Room = makeRoom({ players: [ctx.client_id] });
  matches.set(matchId, match);
  return matchId;
}

function join_match(ctx: RPCContext, matchId: number) {
  const match = matches.get(matchId);
  if (!match) {
    throw new Error(`Match ${matchId} does not exist`);
  }
  match.players.push(ctx.client_id);
}

function list_matches() {
  return Array.from(matches.entries());
}

export default { join_match, create_match, list_matches };