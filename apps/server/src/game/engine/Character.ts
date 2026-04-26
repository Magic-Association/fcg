import { Card } from "@engine/Card.js";
import { GameState } from "@engine/GameState.js";

export type Character = {
  id: string;
  controllerId: string;
  teamId: string;
  personalScore: number;
  drawPile: Card[];
  hand: Card[];
  discardPile: Card[];
};

type CreateCharacterParams = {
  id: string;
  controllerId: string;
  teamId: string;
};

export const createCharacter = (params: CreateCharacterParams): Character => {
  return {
    ...params,
    personalScore: 0,
    drawPile: [],
    hand: [],
    discardPile: [],
  };
};

export function lookupCharacter(state: GameState, charId: string) {
  const char = state.characters.get(charId);
  if (!char) throw new Error(`Character with id ${charId} not found`);
  return char;
}
