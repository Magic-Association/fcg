import { Draft } from "immer";
import { Card } from "@engine/Card.js";
import { Character } from "@engine/Character.js";
import { charAction } from "@engine/characterAction.js";
import { mathRandomSource } from "@engine/random.js";
import { EmitGameEvent } from "@engine/gameAction.js";

const shuffle = (cards: Card[]) => {
  // Fisher-Yates
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(mathRandomSource.nextFloat() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
};

const reshuffleDraft = (c: Draft<Character>, emit: EmitGameEvent) => {
  if (c.drawPile.length !== 0 || c.discardPile.length === 0) return;

  const newDrawPile = [...c.discardPile];
  shuffle(newDrawPile);
  c.drawPile = newDrawPile;
  c.discardPile = [];

  emit({
    type: "deckReshuffled",
    payload: {
      character: c,
    },
  });
};

export const reshuffle = () => charAction(reshuffleDraft);

export const drawCard = () =>
  charAction((c, emit) => {
    reshuffleDraft(c, emit);

    const card = c.drawPile.pop();
    if (!card) return;
    c.hand.push(card);

    emit({
      type: "cardDrawn",
      payload: {
        character: c,
        card: card,
      },
    });
  });
