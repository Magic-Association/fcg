import { CardData } from "@engine/Card.js";

// minimal examples to prove the ActionSpec -> GameAction path
export const cardOne = {
  name: "Basic",
  description: `Add ${3} score, then add ${1} score.`,
  onPlay: {
    type: "sequence",
    actions: [
      { type: "addScore", amount: { type: "constant", value: 3 } },
      { type: "addScore", amount: { type: "constant", value: 1 } },
    ],
  },
} as const satisfies CardData;

export const cardTwo = {
  name: "Simple",
  description: `Add ${2} score.`,
  onPlay: {
    type: "addScore",
    amount: { type: "constant", value: 2 },
  },
} as const satisfies CardData;
