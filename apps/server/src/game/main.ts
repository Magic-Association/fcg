import { baseState } from "@engine/GameState.js";
import { cardOne, cardTwo } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";
import { playTurn } from "@engine/core.js";

const engine = new Engine(baseState);

const cards = [cardOne, cardTwo].map(createCard);

for (const card of cards) {
  const result = engine.apply(playTurn(card));
  for (const event of result.events) {
    console.log(event);
  }
  console.log(result.state);
}
