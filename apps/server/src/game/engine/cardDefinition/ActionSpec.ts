import { addCharacterScore } from "@actions/addCharacterScore.js";
import { addScore } from "@actions/addScore.js";
import { GameAction, pipe } from "../gameAction.js";
import { resolveCharacterTargets } from "./resolveCharacterTargets.js";
import { resolveValueSpec, ValueSpec } from "./ValueSpec.js";
import { TargetSpec } from "./TargetSpec.js";
import { charActionToGameAction } from "@engine/characterAction.js";
import { Character } from "@engine/GameState.js";
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

export const toGameActions = (source: Character, specs: ActionSpec[]): GameAction[] =>
  specs.map((spec) => {
    switch (spec.type) {
      case "addScore":
        return (state) => addScore(resolveValueSpec(spec.amount, state))(state);

      case "addCharacterScore":
        return (state) => {
          const targets = resolveCharacterTargets(spec.target, state, source);
          const amount = resolveValueSpec(spec.amount, state);
          const action = addCharacterScore(amount);

          return pipe(...targets.map((target) => charActionToGameAction(target, action)))(state);
        };
    }
  });
