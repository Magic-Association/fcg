import { describe, expect, test } from "vitest";
import { playTurn } from "@actions/core.js";
import { cardFive, cardFour } from "@cards/testCards.js";
import { createCard, createCardFactory } from "@engine/Card.js";
import Engine from "@engine/Engine.js";
import { base1v1State } from "@engine/GameState.js";
import { createCounterIdSource } from "@engine/idSource.js";

describe("createCard", () => {
  test("uses the provided id source and applies a self-targeting action", () => {
    const engine = new Engine(base1v1State);
    const createTestCard = createCardFactory(createCounterIdSource("card"));
    const card = createTestCard(cardFour, "character-one");

    const result = engine.apply(playTurn(card));

    expect(card.id).toBe("card-0");
    expect(result.events).toHaveLength(2);
    expect(result.events[0]).toMatchObject({
      type: "cardPlayed",
      payload: {
        card: {
          id: "card-0",
          ownerId: "character-one",
          data: { name: "Lock In" },
        },
      },
    });
    expect(result.events[1]).toEqual({
      type: "characterScoreChanged",
      payload: {
        characterId: "character-one",
        before: 0,
        after: 2,
      },
    });
    expect(engine.state.turn).toBe(2);
    expect(engine.state.characters.get("character-one")?.personalScore).toBe(2);
  });

  test("resolves all-character targets against the current game state", () => {
    const engine = new Engine(base1v1State);
    const createTestCard = createCardFactory(createCounterIdSource("card"));
    const card = createTestCard(cardFive, "character-one");

    const result = engine.apply(playTurn(card));

    expect(result.events.slice(1)).toEqual([
      {
        type: "characterScoreChanged",
        payload: {
          characterId: "character-one",
          before: 0,
          after: 1,
        },
      },
      {
        type: "characterScoreChanged",
        payload: {
          characterId: "character-two",
          before: 0,
          after: 1,
        },
      },
    ]);
    expect(engine.state.characters.get("character-one")?.personalScore).toBe(1);
    expect(engine.state.characters.get("character-two")?.personalScore).toBe(1);
  });

  test("default createCard still creates a usable runtime card", () => {
    const card = createCard(cardFour, "character-one");

    expect(card.ownerId).toBe("character-one");
    expect(typeof card.id).toBe("string");
    expect(card.id.length).toBeGreaterThan(0);
  });
});
