import { addScore } from "@actions/addScore.js";
import { GameAction, pipe } from "./gameAction.js";

export type PrimitiveActionSpec = {
  type: "addScore";
  amount: number;
};

export type ActionCompositionSpec = {
  type: "sequence";
  actions: ActionSpec[];
};

export type ActionSpec = PrimitiveActionSpec | ActionCompositionSpec;

export const toGameAction = (spec: ActionSpec): GameAction => {
  switch (spec.type) {
    case "addScore":
      return addScore(spec.amount);
    case "sequence":
      return pipe(...spec.actions.map(toGameAction));
  }
};
