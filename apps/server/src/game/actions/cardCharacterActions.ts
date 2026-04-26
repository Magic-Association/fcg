import { Card } from "@engine/Card.js";
import { charAction } from "@engine/characterAction.js";
import { mathRandomSource } from "@engine/random.js";

const shuffle = (cards: Card[]) => {
  // Fisher-Yates
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(mathRandomSource.nextFloat() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

export const reshuffle = () =>
  charAction((c, _emit) => {
    if (c.drawPile.length !== 0 || c.discardPile.length === 0) return;

    const newDrawPile = [...c.discardPile];
    shuffle(newDrawPile);
    c.drawPile = newDrawPile;
    c.discardPile = [];
  });

export const drawCard = () =>
  charAction((c, _emit) => {
    if (c.drawPile.length === 0) {
      // reshuffle
    }
    const card = c.drawPile.pop();
    if (!card) return;
    c.hand.push(card);
  });
