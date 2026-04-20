import { GameState } from "@engine/GameState.js";
import { TargetSpec } from "./TargetSpec.js";

export const resolveCharacterTargets = (
  target: TargetSpec,
  state: GameState,
): string[] => {
  const sourceCharacter = getSourceCharacter(state);

  switch (target.type) {
    case "self":
      return [sourceCharacter.id];
    case "allies":
      return [...state.characters.values()]
        .filter((character) => character.teamId === sourceCharacter.teamId)
        .map((character) => character.id);
    case "enemies":
      return [...state.characters.values()]
        .filter((character) => character.teamId !== sourceCharacter.teamId)
        .map((character) => character.id);
  }
};
