import { Draft, produce } from "immer";
import { Character } from "@engine/GameState.js";
import { GameEvent } from "@engine/GameEvent.js";
import { action } from "./gameAction.js";

export type CharacterActionResult = {
  character: Character;
  events: GameEvent[];
};
export type CharacterAction = (character: Character) => CharacterActionResult;

export const charAction =
  (recipe: (draft: Draft<Character>, emit: (event: GameEvent) => void) => void) =>
  (character: Character) => {
    const events: GameEvent[] = [];
    const emit = (e: GameEvent) => events.push(e);
    const nextCharacter = produce(character, (draft) => recipe(draft, emit));
    return { character: nextCharacter, events };
  };

export const charActionToGameAction = (target: Character, charAction: CharacterAction) =>
  action((g, emit) => {
    const { character, events } = charAction(target);
    g.characters.set(target.id, character);
    events.forEach(emit);
  });
