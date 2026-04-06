import { baseState } from "@engine/GameState.js";
import { pipe } from "@engine/gameAction.js";
import { cardOne } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";
import { playTurn } from "@engine/core.js";

const engine = new Engine(baseState);

const cards = [cardOne, cardOne].map(createCard);

for (const card of cards) {
  const state = engine.apply(playTurn(card));
  console.log(state);
}
