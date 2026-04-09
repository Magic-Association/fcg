import { addScore } from "@actions/addScore.js";
import { GameAction } from "../gameAction.js";
import { resolveValueSpec, ValueSpec } from "./ValueSpec.js";

export type GameActionSpec = {
  type: "addScore";
  amount: ValueSpec;
};

export type ActionSpec = GameActionSpec;

export const toGameActions = (specs: ActionSpec[]): GameAction[] => {
  const actions: GameAction[] = [];
  for (const spec of specs) {
    switch (spec.type) {
      case "addScore":
        actions.push((state) => addScore(resolveValueSpec(spec.amount, state))(state));
        break;
    }
  }
  return actions;
};
