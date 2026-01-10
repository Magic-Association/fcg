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
  if (match.players.includes(ctx.client_id)) {
    throw new Error(`Client ${ctx.client_id} is already in match ${matchId}`);
  }
  if (
    match.gamemode.teamSetup.reduce((sum, team) => sum + team.size, 0) <=
    match.players.length
  ) {
    throw new Error(`Match ${matchId} is full`);
  }
  match.players.push(ctx.client_id);
  lobbyBroadcast({ action: "update_match", payload: match });
}

function list_matches(_ctx: RPCContext) {
  return Array.from(matches.values());
}

function leave_match(ctx: RPCContext, matchId: number) {
  const match = matches.get(matchId);
  if (!match) {
    throw new Error(`Match ${matchId} does not exist`);
  }
  if (!match.players.includes(ctx.client_id)) {
    throw new Error(`Client ${ctx.client_id} is not in match ${matchId}`);
  }

  match.players = match.players.filter((id) => id !== ctx.client_id);

  if (match.players.length === 0) {
    matches.delete(matchId);
    lobbyBroadcast({ action: "remove_match", payload: matchId });
  } else {
    lobbyBroadcast({ action: "update_match", payload: match });
  }
}

function start_match(ctx: RPCContext, matchId: number) {
  const match = matches.get(matchId);
  if (!match) {
    throw new Error(`Match ${matchId} does not exist`);
  }
  if (!match.players.includes(ctx.client_id)) {
    throw new Error(
      `Client ${ctx.client_id} is not in match ${matchId} and cannot start it`,
    );
  }
  if (match.state !== "waiting") {
    throw new Error(`Match ${matchId} is already ${match.state}`);
  }

  match.state = "in_progress";
  lobbyBroadcast({ action: "update_match", payload: match });
}

function end_match(ctx: RPCContext, matchId: number) {
  const match = matches.get(matchId);
  if (!match) {
    throw new Error(`Match ${matchId} does not exist`);
  }
  if (!match.players.includes(ctx.client_id)) {
    throw new Error(
      `Client ${ctx.client_id} is not in match ${matchId} and cannot end it`,
    );
  }

  match.state = "finished";
  lobbyBroadcast({ action: "update_match", payload: match });

  matches.delete(matchId);
  lobbyBroadcast({ action: "remove_match", payload: matchId });
}

const matchRpcs = {
  join_match,
  create_match,
  list_matches,
  leave_match,
  start_match,
  end_match,
};

export {
  join_match,
  create_match,
  list_matches,
  leave_match,
  start_match,
  end_match,
};
export default matchRpcs;
