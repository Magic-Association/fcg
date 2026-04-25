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

const createCardWithId = (data: CardData, ownerId: string, id: string): Card => {
  const card = {
    id,
    ownerId,
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

export const createCardFactory = (idSource: IdSource) => {
  return (data: CardData, ownerId: string): Card =>
    createCardWithId(data, ownerId, idSource.nextId());
};

export const createCard = (data: CardData, ownerId: string): Card => {
  const gameObject = createOwnedGameObject(ownerId);
  return createCardWithId(data, ownerId, gameObject.id);
};
