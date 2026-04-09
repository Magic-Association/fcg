import { GameEvent } from "@engine/GameEvent.js";
import { GameAction } from "@engine/gameAction.js";
import { CharacterTargetSpec } from "@engine/cardDefinition/TargetSpec.js";
import { resolveCharacterTargets } from "@engine/cardDefinition/resolveCharacterTargets.js";

export const addCharacterScore =
  (target: CharacterTargetSpec, amount: number): GameAction =>
  (state, context) => {
    const targetCharacterIds = resolveCharacterTargets(target, state, context);
    const characters = new Map(state.characters);
    const events: GameEvent[] = [];

    for (const characterId of targetCharacterIds) {
      const character = characters.get(characterId);
      if (!character) {
        throw new Error(`Character "${characterId}" not found.`);
      }

      const nextPersonalScore = character.personalScore + amount;
      characters.set(characterId, {
        ...character,
        personalScore: nextPersonalScore,
      });
      events.push({
        type: "characterScoreChanged",
        payload: { characterId, before: character.personalScore, after: nextPersonalScore },
      });
    }

    return {
      state: {
        ...state,
        characters,
      },
      events,
    };
  };
