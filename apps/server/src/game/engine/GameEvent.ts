import { Card } from "@engine/Card.js";
import { Character } from "./Character.js";

export type EventMap = {
  cardDrawn: { character: Character; card: Card };
  deckReshuffled: { character: Character };
  cardPlayed: { card: Card };
  scoreChanged: { before: number; after: number };
  characterScoreChanged: { characterId: string; before: number; after: number };
};

export type GameEvent = {
  [K in keyof EventMap]: { type: K; payload: EventMap[K] };
}[keyof EventMap];
