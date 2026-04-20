import { Character, GameState } from "@engine/GameState.js";
import { TargetSpec } from "./TargetSpec.js";

export const resolveCharacterTargets = (
  target: TargetSpec,
  state: GameState,
  sourceCharacter: Character,
): Character[] => {
  switch (target.type) {
    case "self":
      return [sourceCharacter];
    case "allies":
      return [...state.characters.values()].filter(
        (character) => character.teamId === sourceCharacter.teamId,
      );
    case "enemies":
      return [...state.characters.values()].filter(
        (character) => character.teamId !== sourceCharacter.teamId,
      );
    case "allCharacters":
      return [...state.characters.values()];
  }
};
