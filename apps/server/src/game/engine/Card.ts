import { action, pipe, GameAction } from "@engine/gameAction.js";

export type CardData = {
  name: string;
  description: string;
  onPlay: GameAction;
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
    data.onPlay,
  );

  return {
    data,
    play,
  };
};
