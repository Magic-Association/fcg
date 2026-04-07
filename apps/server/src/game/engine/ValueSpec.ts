import type { GameState } from "@engine/GameState.js";

export type ConstantValueSpec = {
  type: "constant";
  value: number;
};

export type CurrentTurnValueSpec = {
  type: "currentTurn";
};

export type AddValueSpec = {
  type: "add";
  left: ValueSpec;
  right: ValueSpec;
};

export type MultiplyValueSpec = {
  type: "multiply";
  left: ValueSpec;
  right: ValueSpec;
};

export type ValueSpec = ConstantValueSpec | CurrentTurnValueSpec | AddValueSpec | MultiplyValueSpec;

export const resolveValueSpec = (spec: ValueSpec, state: GameState): number => {
  switch (spec.type) {
    case "constant":
      return spec.value;
    case "currentTurn":
      return state.turn;
    case "add":
      return resolveValueSpec(spec.left, state) + resolveValueSpec(spec.right, state);
    case "multiply":
      return resolveValueSpec(spec.left, state) * resolveValueSpec(spec.right, state);
  }
};
