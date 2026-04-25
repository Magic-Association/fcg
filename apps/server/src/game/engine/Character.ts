import { Card } from "@engine/Card.js";
import { GameState } from "@engine/GameState.js";

export type Character = {
  id: string;
  controllerId: string;
  teamId: string;
  personalScore: number;
  hand: Card[];
};

export function lookupCharacter(state: GameState, charId: string) {
  const char = state.characters.get(charId);
  if (!char) throw new Error(`Character with id ${charId} not found`);
  return char;
}
