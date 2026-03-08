import { CardData } from "@engine/Card.js";
import { action, pipe } from "@engine/gameAction.js";

export const incrementTurn = () =>
  action((g) => {
    g.turn += 1;
  });

export const playTurn = (card: CardData) => pipe(card.onPlay, incrementTurn());
