import { baseState } from "@engine/GameState.js";
import { pipe } from "@engine/gameAction.js";
import { fireball, lightning } from "@cards/testCards.js";
import Engine from "@engine/Engine.js";
import { createCard } from "@engine/Card.js";

const engine = new Engine(baseState);

const cards = [fireball, lightning].map(createCard);

engine.apply(pipe(...cards.map((card) => card.play)));