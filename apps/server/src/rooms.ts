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
