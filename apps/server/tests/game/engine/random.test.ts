import { describe, expect, test } from "vitest";
import { createSeededRandomSource } from "@engine/random.js";

describe("createSeededRandomSource", () => {
  test("produces the same sequence for the same seed", () => {
    const first = createSeededRandomSource(12345);
    const second = createSeededRandomSource(12345);

    const firstSequence = [first.nextFloat(), first.nextFloat(), first.nextFloat()];
    const secondSequence = [second.nextFloat(), second.nextFloat(), second.nextFloat()];

    expect(firstSequence).toEqual(secondSequence);
    expect(firstSequence.every((value) => value >= 0 && value < 1)).toBe(true);
  });

  test("produces different sequences for different seeds", () => {
    const first = createSeededRandomSource(12345);
    const second = createSeededRandomSource(54321);

    const firstSequence = [first.nextFloat(), first.nextFloat(), first.nextFloat()];
    const secondSequence = [second.nextFloat(), second.nextFloat(), second.nextFloat()];

    expect(firstSequence).not.toEqual(secondSequence);
  });
});
