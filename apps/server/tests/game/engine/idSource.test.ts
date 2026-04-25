import { describe, expect, test } from "vitest";
import { createCounterIdSource, createRandomIdSource } from "@engine/idSource.js";
import { createSeededRandomSource } from "@engine/random.js";

describe("id sources", () => {
  test("createCounterIdSource returns predictable ids", () => {
    const idSource = createCounterIdSource("card");

    expect(idSource.nextId()).toBe("card-0");
    expect(idSource.nextId()).toBe("card-1");
    expect(idSource.nextId()).toBe("card-2");
  });

  test("createRandomIdSource can be deterministic with a seeded random source", () => {
    const first = createRandomIdSource(createSeededRandomSource(7), "card");
    const second = createRandomIdSource(createSeededRandomSource(7), "card");

    const firstIds = [first.nextId(), first.nextId(), first.nextId()];
    const secondIds = [second.nextId(), second.nextId(), second.nextId()];

    expect(firstIds).toEqual(secondIds);
  });
});
