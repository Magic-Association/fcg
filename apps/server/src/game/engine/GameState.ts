import { Character } from "@engine/Character.js";

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
      {
        id: "character-one",
        controllerId: "player-one",
        teamId: "team-one",
        personalScore: 0,
        hand: [],
      },
    ],
    [
      "character-two",
      {
        id: "character-two",
        controllerId: "player-two",
        teamId: "team-two",
        personalScore: 0,
        hand: [],
      },
    ],
  ]),
} as const satisfies GameState;
