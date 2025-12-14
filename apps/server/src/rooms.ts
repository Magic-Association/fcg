export type Room = {
  id: number;
  name?: string;
  players: number[];
  createdAt: Date;
};

let nextRoomId = 1;

export function makeRoom(
  data: Pick<Room, "name"> & Partial<Pick<Room, "players">> = {},
): Room {
  return { players: [], ...data, id: nextRoomId++, createdAt: new Date() };
}

export const exampleMatches = new Map<number, Room>(
  Array.from({ length: 20 }, (_, i) => [
    i,
    makeRoom({ name: `Match ${i + 1}` }),
  ]),
);
