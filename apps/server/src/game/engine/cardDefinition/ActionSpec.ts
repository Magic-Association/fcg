import { addCharacterScore } from "@actions/addCharacterScore.js";
import { addScore } from "@actions/addScore.js";
import { GameAction } from "../gameAction.js";
import { resolveValueSpec, ValueSpec } from "./ValueSpec.js";
import { CharacterTargetSpec } from "./TargetSpec.js";

export type { CharacterTargetSpec } from "./TargetSpec.js";

export type AddScoreActionSpec = {
  type: "addScore";
  amount: ValueSpec;
};

export type AddCharacterScoreActionSpec = {
  type: "addCharacterScore";
  target: CharacterTargetSpec;
  amount: ValueSpec;
};

export type ActionSpec = AddScoreActionSpec | AddCharacterScoreActionSpec;

export const toGameActions = (specs: ActionSpec[]): GameAction[] => {
  const actions: GameAction[] = [];
  for (const spec of specs) {
    switch (spec.type) {
      case "addScore":
        actions.push((state, context) =>
          addScore(resolveValueSpec(spec.amount, state))(state, context),
        );
        break;
      case "addCharacterScore":
        actions.push((state, context) =>
          addCharacterScore(spec.target, resolveValueSpec(spec.amount, state))(state, context),
        );
        break;
    }
  }
  return actions;
};
