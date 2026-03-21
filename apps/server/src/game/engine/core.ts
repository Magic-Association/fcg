import { Card } from "@engine/Card.js";
import { action, pipe } from "@engine/gameAction.js";

export const incrementTurn = () =>
  action((g) => {
    g.turn += 1;
  });

export const playTurn = (card: Card) => pipe(card.play, incrementTurn());