export type EventMap = {
  cardPlayed: { name: string };
  scoreChanged: { before: number; after: number };
};

export type GameEvent = {
  [K in keyof EventMap]: { type: K; payload: EventMap[K] };
}[keyof EventMap];
