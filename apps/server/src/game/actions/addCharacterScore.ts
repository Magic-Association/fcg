import { charAction } from "@engine/characterAction.js";

export const addCharacterScore = (amount: number) =>
  charAction((c, emit) => {
    const beforeScore = c.personalScore;
    c.personalScore += amount;

    emit({
      type: "characterScoreChanged",
      payload: {
        characterId: c.id,
        before: beforeScore,
        after: c.personalScore,
      },
    });
  });
