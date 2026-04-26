import { Draft, produce } from "immer";
import { Character, lookupCharacter } from "@engine/Character.js";
import { GameEvent } from "@engine/GameEvent.js";
import { action, EmitGameEvent } from "./gameAction.js";

export type CharacterActionResult = {
  character: Character;
  events: GameEvent[];
};
export type CharacterAction = (character: Character) => CharacterActionResult;

export const charAction =
  (recipe: (draft: Draft<Character>, emit: EmitGameEvent) => void) =>
  (character: Character) => {
    const events: GameEvent[] = [];
    const emit = (e: GameEvent) => events.push(e);
    const nextCharacter = produce(character, (draft) => recipe(draft, emit));
    return { character: nextCharacter, events };
  };

export const charActionToGameAction = (targetId: string, charAction: CharacterAction) =>
  action((g, emit) => {
    const target = lookupCharacter(g, targetId);

    const { character, events } = charAction(target);
    g.characters.set(target.id, character);
    events.forEach(emit);
  });
