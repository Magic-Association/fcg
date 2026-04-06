import { addScore } from "@actions/addScore.js";
import { pipe } from "@engine/gameAction.js";
import { CardData } from "@engine/Card.js";

// minimal example
export const cardOne = {
  name: "Basic",
  description: `Add ${3} score, then add ${1} score.`,
  onPlay: {
    type: "sequence",
    actions: [
      { type: "addScore", amount: 3 },
      { type: "addScore", amount: 1 },
    ],
  },
} as const satisfies CardData;
