import { base1v1State, baseState } from "@engine/GameState.js";
import { cardFour, cardOne, cardThree, cardTwo } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";
import { playTurn } from "@engine/core.js";

const engine = new Engine(base1v1State);

const cards = [cardOne, cardTwo, cardThree, cardFour].map(createCard);

for (const card of cards) {
  const result = engine.apply(playTurn(card));
  for (const event of result.events) {
    console.log(event);
  }
  console.log(result.state);
}
