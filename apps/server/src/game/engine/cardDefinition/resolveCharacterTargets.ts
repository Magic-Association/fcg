import { GameState } from "@engine/GameState.js";
import { TargetSpec } from "./TargetSpec.js";
import { Character, lookupCharacter } from "@engine/Character.js";

const targetFilters: Record<
  TargetSpec["type"],
  (source: Character, potentialTarget: Character) => boolean
> = {
  self: (source, target) => target.id === source.id,
  allies: (source, target) => target.teamId === source.teamId,
  enemies: (source, target) => target.teamId !== source.teamId,
  allCharacters: () => true,
};

export const resolveCharacterTargets = (
  targetSpec: TargetSpec,
  state: GameState,
  sourceCharacterId: string,
): string[] => {
  const chars = [...state.characters.values()];
  const source = lookupCharacter(state, sourceCharacterId);

  return chars.filter((target) => targetFilters[targetSpec.type](source, target)).map((c) => c.id);
};
