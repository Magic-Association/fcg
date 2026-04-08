import { action, pipe, GameAction } from "@engine/gameAction.js";
import { ActionSpec, toGameActions } from "./cardDefinition/ActionSpec.js";

export type CardData = {
  name: string;
  description: string;
  onPlay: ActionSpec[];
};

export type Card = {
  data: CardData;
  play: GameAction;
};

// make OwnedGameObject
export const createCard = (data: CardData): Card => {
  const card = {
    data,
    play: pipe(
      action((_g, emit) => {
        emit({ type: "cardPlayed", payload: { card } });
      }),
      ...toGameActions(data.onPlay),
    ),
  };
  return card;
};
