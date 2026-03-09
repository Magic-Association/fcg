import { Gamemode, Gamemodes } from "./game/Gamemode.js";

export type MatchState = "waiting" | "in_progress" | "finished";

export type Room = {
  id: number;
  gamemode: Gamemode;
  players: number[];
  createdAt: Date;
  state: MatchState;
};

let nextRoomId = 1;

export function makeRoom(data: Partial<Room> = {}): Room {
  return {
    players: [],
    gamemode: Gamemodes.Standard,
    state: "waiting",
    ...data,
    id: nextRoomId++,
    createdAt: new Date(),
  };
}

export const exampleMatches = new Map<number, Room>(
  Array.from({ length: 10 }, () => {
    const room = makeRoom();
    return [room.id, room];
  }),
);
