import { action, pipe, GameAction } from "@engine/gameAction.js";
import { IdSource } from "@engine/idSource.js";
import { ActionSpec, toGameActions } from "./cardDefinition/ActionSpec.js";
import { createOwnedGameObject, OwnedGameObject } from "./GameObject.js";

export type CardData = {
  name: string;
  description: string;
  onPlay: ActionSpec[];
};

export type Card = OwnedGameObject & {
  data: CardData;
  play: GameAction;
};

export const createCard = (data: CardData, ownerId: string, idSource?: IdSource): Card => {
  const card = {
    ...createOwnedGameObject(ownerId, idSource),
    data,
    play: pipe(
      action((_g, emit) => {
        emit({ type: "cardPlayed", payload: { card } });
      }),
      ...toGameActions(ownerId, data.onPlay),
    ),
  };
  return card;
};
