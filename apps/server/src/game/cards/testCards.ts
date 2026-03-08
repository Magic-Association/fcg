import { addScore } from "@actions/addScore.js";
import { pipe } from "@engine/gameAction.js";
import { CardData } from "@engine/Card.js";

// minimal examples to test engine features
export const cardOne = {
  name: "Basic",
  description: `Add ${3} score, then add ${1} score.`,
  onPlay: pipe(addScore(3), addScore(1)),
} as const satisfies CardData;

export const cardTwo = {
  name: "Using GameState inline",
  description: `Add ${2} score per turn, plus an additional ${1} score.`,
  onPlay: (g) => addScore(g.turn * 2 + 1)(g),
} as const satisfies CardData;

const cardThree = {
  name: "Reactive",
  description: `When you gain score, gain an additional ${2} score.`,
  onPlay: {},
} as const;

const cardFour = {
	name: "Proactive",
	description: `Before you gain score, add ${1} to that score.`,
	onPlay: {},
} as const;