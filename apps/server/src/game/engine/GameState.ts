/*
for example purposes, there will be a generic score
to test cards on without characters involved yet
*/

export type Character = {
  id: string;
  controllerId: string;
  teamId: string;
  personalScore: number;
};

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
      },
    ],
    [
      "character-two",
      {
        id: "character-two",
        controllerId: "player-two",
        teamId: "team-two",
        personalScore: 0,
      },
    ],
  ]),
} as const satisfies GameState;
