import { Character, createCharacter } from "@engine/Character.js";

export type GameState = {
  turn: number;
  score: number;
  characters: Map<string, Character>;
};

export const baseState = {
  turn: 1,
  score: 0,
  characters: new Map(),
} as const satisfies GameState;

export const base1v1State = {
  ...baseState,
  characters: new Map([
    [
      "character-one",
      createCharacter({
        id: "character-one",
        controllerId: "player-one",
        teamId: "team-one",
      }),
    ],
    [
      "character-two",
      createCharacter({
        id: "character-two",
        controllerId: "player-two",
        teamId: "team-two",
      }),
    ],
  ]),
} as const satisfies GameState;
