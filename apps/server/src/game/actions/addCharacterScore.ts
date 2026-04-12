import { action } from "@engine/gameAction.js";

export const addCharacterScore = (targetId: string, amount: number) =>
  action((g, emit) => {
    const characters = new Map(g.characters);

    const character = characters.get(targetId);
    if (!character) {
      throw new Error(`Character "${targetId}" not found.`);
    }

    const nextPersonalScore = character.personalScore + amount;
    characters.set(targetId, {
      ...character,
      personalScore: nextPersonalScore,
    });

    emit({
      type: "characterScoreChanged",
      payload: {
        characterId: targetId,
        before: character.personalScore,
        after: nextPersonalScore,
      },
    });
  });
