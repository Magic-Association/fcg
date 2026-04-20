import { addCharacterScore } from "@actions/addCharacterScore.js";
import { addScore } from "@actions/addScore.js";
import { GameAction, pipe } from "../gameAction.js";
import { resolveCharacterTargets } from "./resolveCharacterTargets.js";
import { resolveValueSpec, ValueSpec } from "./ValueSpec.js";
import { TargetSpec } from "./TargetSpec.js";

export type { TargetSpec } from "./TargetSpec.js";

export type AddScoreActionSpec = {
  type: "addScore";
  amount: ValueSpec;
};

export type AddCharacterScoreActionSpec = {
  type: "addCharacterScore";
  target: TargetSpec;
  amount: ValueSpec;
};

export type ActionSpec = AddScoreActionSpec | AddCharacterScoreActionSpec;

export const toGameActions = (specs: ActionSpec[]): GameAction[] => {
  const actions: GameAction[] = [];
  for (const spec of specs) {
    switch (spec.type) {
      case "addScore":
        actions.push((state) =>
          addScore(resolveValueSpec(spec.amount, state))(state),
        );
        break;
      case "addCharacterScore":
        actions.push((state) => {
          const amount = resolveValueSpec(spec.amount, state);
          const targetCharacterIds = resolveCharacterTargets(
            spec.target,
            state,
          );
          const targetActions = targetCharacterIds.map((targetId) =>
            addCharacterScore(targetId, amount),
          );
          return pipe(...targetActions)(state);
        });
        break;
    }
  }
  return actions;
};
