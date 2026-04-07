import { action } from "@engine/gameAction.js";
import { resolveValueSpec } from "@engine/ValueSpec.js";
import type { ValueSpec } from "@engine/ValueSpec.js";

export const addScore = (amount: ValueSpec) =>
  action((g, emit) => {
    const resolvedAmount = resolveValueSpec(amount, g);
    const before = g.score;
    g.score += resolvedAmount;
    emit({
      type: "scoreChanged",
      payload: { before, after: g.score },
    });
  });
