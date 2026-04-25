import { randomUUID } from "node:crypto";
import { RandomSource, mathRandomSource } from "./random.js";

export type IdSource = {
  nextId: () => string;
};

export const cryptoIdSource: IdSource = {
  nextId: () => randomUUID(),
};

export const createCounterIdSource = (prefix = "game-object"): IdSource => {
  let index = 0;

  return {
    nextId: () => `${prefix}-${index++}`,
  };
};

export const createRandomIdSource = (
  random: RandomSource = mathRandomSource,
  prefix = "game-object",
): IdSource => {
  let index = 0;

  return {
    nextId: () => {
      const randomPart = Math.floor(random.nextFloat() * 0x100000000).toString(36);
      return `${prefix}-${index++}-${randomPart}`;
    },
  };
};
