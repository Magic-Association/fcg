import { CardData } from "@engine/Card.js";

// minimal examples to prove the ActionSpec -> GameAction path
export const cardOne = {
  name: "Basic",
  description: `Add ${3} score, then add ${1} score.`,
  onPlay: [
    { type: "addScore", amount: { type: "constant", value: 3 } },
    { type: "addScore", amount: { type: "constant", value: 1 } },
  ],
} as const satisfies CardData;

export const cardTwo = {
  name: "Scaling",
  description: "Add a score amount that scales with the current turn.",
  onPlay: [
    {
      type: "addScore",
      amount: {
        type: "multiply",
        left: { type: "currentTurn" },
        right: { type: "constant", value: 2 },
      },
    },
  ],
} as const satisfies CardData;

export const cardThree = {
  name: "Burst",
  description: "Add the current turn plus one as a single score change.",
  onPlay: [
    {
      type: "addScore",
      amount: {
        type: "add",
        left: { type: "currentTurn" },
        right: { type: "constant", value: 1 },
      },
    },
  ],
} as const satisfies CardData;

export const cardFour = {
  name: "Lock In",
  description: "Give yourself 2 personal score.",
  onPlay: [
    {
      type: "addCharacterScore",
      target: { type: "self" },
      amount: { type: "constant", value: 2 },
    },
  ],
} as const satisfies CardData;

export const cardFive = {
  name: "Point Party",
  description: "Add 1 score to all characters.",
  onPlay: [
    {
      type: "addCharacterScore",
      target: { type: "allCharacters" },
      amount: { type: "constant", value: 1 },
    },
  ],
} as const satisfies CardData;
