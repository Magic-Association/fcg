import { action, pipe, GameAction } from "@engine/gameAction.js";
import { ActionSpec, toGameActions } from "./cardDefinition/ActionSpec.js";
import { createOwnedGameObject, OwnedGameObject } from "./GameObject.js";
import { Character } from "./GameState.js";

export type CardData = {
  name: string;
  description: string;
  onPlay: ActionSpec[];
};

export type Card = OwnedGameObject & {
  data: CardData;
  play: GameAction;
};

export const createCard = (data: CardData, owner: Character): Card => {
  const card = {
    ...createOwnedGameObject(owner),
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
