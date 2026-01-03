import { Gamemode, Gamemodes } from "./game/Gamemode.js";

export type Room = {
  id: number;
  gamemode: Gamemode;
  players: number[];
  createdAt: Date;
};

let nextRoomId = 1;

export function makeRoom(data: Partial<Room> = {}): Room {
  return {
    players: [],
    gamemode: Gamemodes.Standard,
    ...data,
    id: nextRoomId++,
    createdAt: new Date(),
  };
}

export const exampleMatches = new Map<number, Room>(
  Array.from({ length: 10 }, (_, i) => [i, makeRoom()]),
);
