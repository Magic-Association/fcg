import { addScore } from "@actions/addScore.js";
import { GameAction, pipe } from "./gameAction.js";

export type ActionSpec =
  | { type: "addScore"; amount: number }
  | { type: "sequence"; actions: ActionSpec[] };

export const toGameAction = (spec: ActionSpec): GameAction => {
  switch (spec.type) {
    case "addScore":
      return addScore(spec.amount);
    case "sequence":
      return pipe(...spec.actions.map(toGameAction));
  }
};
