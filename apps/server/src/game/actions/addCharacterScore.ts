import { GameEvent } from "@engine/GameEvent.js";
import { GameAction } from "@engine/gameAction.js";

export const addCharacterScore =
  (targetCharacterIds: string[], amount: number): GameAction =>
  (state) => {
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
