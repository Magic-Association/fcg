import { Card } from "@engine/Card.js";
import { charAction } from "@engine/characterAction.js";

export const addCardToHand = (card: Card) =>
  charAction((c, _emit) => {
    c.hand.push(card);
  });
