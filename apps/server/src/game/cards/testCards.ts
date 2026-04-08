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

// todo: imitate-like card which plays another card at a reduced effectiveness