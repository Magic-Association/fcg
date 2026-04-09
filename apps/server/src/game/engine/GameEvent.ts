import { Card } from "@engine/Card.js";

export type EventMap = {
  cardPlayed: { card: Card };
  scoreChanged: { before: number; after: number };
  characterScoreChanged: { characterId: string; before: number; after: number };
};

export type GameEvent = {
  [K in keyof EventMap]: { type: K; payload: EventMap[K] };
}[keyof EventMap];
