import { baseState } from "@engine/GameState.js";
import { cardFour, cardOne, cardThree, cardTwo } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";
import { playTurn } from "@engine/core.js";

const sourceCharacterId = "character-one";

const engine = new Engine({
  ...baseState,
  characters: new Map([
    [
      sourceCharacterId,
      {
        id: sourceCharacterId,
        controllerId: "player-one",
        teamId: "team-one",
        personalScore: 0,
      },
    ],
    [
      "character-two",
      {
        id: "character-two",
        controllerId: "player-two",
        teamId: "team-two",
        personalScore: 0,
      },
    ],
  ]),
});

const cards = [cardOne, cardTwo, cardThree, cardFour].map(createCard);

for (const card of cards) {
  const result = engine.apply(playTurn(card), { sourceCharacterId });
  for (const event of result.events) {
    console.log(event);
  }
  console.log(result.state);
}
