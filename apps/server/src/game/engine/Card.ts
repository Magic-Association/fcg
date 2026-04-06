import { action, pipe, GameAction } from "@engine/gameAction.js";
import { ActionSpec, toGameAction } from "./ActionSpec.js";

export type CardData = {
  name: string;
  description: string;
  onPlay: ActionSpec;
};

export type Card = {
  data: CardData;
  play: GameAction;
};

// make OwnedGameObject
export const createCard = (data: CardData): Card => {
  const play = pipe(
    action((_g, emit) => {
      emit({ type: "cardPlayed", payload: { name: data.name } });
    }),
    toGameAction(data.onPlay),
  );

  return {
    data,
    play,
  };
};
