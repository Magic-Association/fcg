/*
for example purposes, there will be a generic score
to test cards on without characters involved yet
*/

export type Character = {
  id: string;
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
