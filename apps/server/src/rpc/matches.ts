import { RPCContext } from "./context.js";
import { Room, exampleMatches, makeRoom } from "../rooms.js";
import lobbyBroadcast from "../broadcast/lobbyBroadcast.js";
import { Gamemodes } from "../game/Gamemode.js";

const matches = new Map<number, Room>([...exampleMatches]);

function create_match(ctx: RPCContext, gamemodeName: string) {
  if (!Object.keys(Gamemodes).includes(gamemodeName)) {
    throw new Error(`Invalid gamemode: ${gamemodeName}`);
  }
  const gamemode = Gamemodes[gamemodeName as keyof typeof Gamemodes];
  const match: Room = makeRoom({ players: [ctx.client_id], gamemode });
  matches.set(match.id, match);
  lobbyBroadcast({ action: "update_match", payload: match });
  return match.id;
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
  return Array.from(matches.values());
}

const matchRpcs = { join_match, create_match, list_matches };

export { join_match, create_match, list_matches };
export default matchRpcs;
