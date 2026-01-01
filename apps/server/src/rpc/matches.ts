import { RPCContext } from "./context.js";
import { Room, exampleMatches, makeRoom } from "../rooms.js";
import lobbyBroadcast from "../broadcast/lobbyBroadcast.js";

const matches = new Map<number, Room>([...exampleMatches]);

let lastMatchRoomId = 1;

function create_match(ctx: RPCContext) {
  const matchId = lastMatchRoomId++;
  const match: Room = makeRoom({ players: [ctx.client_id] });
  matches.set(matchId, match);
  lobbyBroadcast({ action: "update_match", payload: match });
  return matchId;
}

function join_match(ctx: RPCContext, matchId: number) {
  const match = matches.get(matchId);
  if (!match) {
    throw new Error(`Match ${matchId} does not exist`);
  }
  match.players.push(ctx.client_id);
  lobbyBroadcast({ action: "update_match", payload: match });
}

function list_matches(_ctx: RPCContext) {
  return Array.from(matches.entries());
}

const matchRpcs = { join_match, create_match, list_matches };

export { join_match, create_match, list_matches };
export default matchRpcs;
