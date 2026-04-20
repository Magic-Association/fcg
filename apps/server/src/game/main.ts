import { base1v1State } from "@engine/GameState.js";
import { cardFour, cardOne, cardThree, cardTwo } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";
import { playTurn } from "@actions/core.js";

const engine = new Engine(base1v1State);

const testingChar = engine.state.characters.get("character-one")!;

const cards = [cardFour].map((cardData) =>
  createCard(cardData, testingChar),
);

for (const card of cards) {
  const result = engine.apply(playTurn(card));
  for (const event of result.events) {
    console.log(event);
  }
  console.log(result.state);
}
