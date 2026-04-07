import { action } from "@engine/gameAction.js";

export const addScore = (amount: number) =>
  action((g, emit) => {
    const before = g.score;
    g.score += amount;
    emit({
      type: "scoreChanged",
      payload: { before, after: g.score },
    });
  });
