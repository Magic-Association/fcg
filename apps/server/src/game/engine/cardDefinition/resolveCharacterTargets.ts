import { GameActionContext } from "@engine/gameAction.js";
import { GameState } from "@engine/GameState.js";
import { CharacterTargetSpec } from "./TargetSpec.js";

const getSourceCharacter = (state: GameState, context: GameActionContext) => {
  if (!context.sourceCharacterId) {
    throw new Error("Missing sourceCharacterId in action context.");
  }

  const sourceCharacter = state.characters.get(context.sourceCharacterId);
  if (!sourceCharacter) {
    throw new Error(`Source character "${context.sourceCharacterId}" not found.`);
  }

  return sourceCharacter;
};

export const resolveCharacterTargets = (
  target: CharacterTargetSpec,
  state: GameState,
  context: GameActionContext,
): string[] => {
  const sourceCharacter = getSourceCharacter(state, context);

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
