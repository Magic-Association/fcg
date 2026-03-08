export type Events = {
  cardPlayed: { name: string };
  scoreChanged: { before: number; after: number };
};

export type GameEvent = {
  [K in keyof Events]: { type: K; payload: Events[K] };
}[keyof Events];