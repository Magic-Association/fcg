import { IdSource, cryptoIdSource } from "@engine/idSource.js";

export const createGameObject = (idSource: IdSource = cryptoIdSource) => {
  return {
    id: idSource.nextId(),
  };
};

export const createOwnedGameObject = (ownerId: string, idSource: IdSource = cryptoIdSource) => {
  return {
    ...createGameObject(idSource),
    ownerId,
  };
};
export type GameObject = ReturnType<typeof createGameObject>;
export type OwnedGameObject = ReturnType<typeof createOwnedGameObject>;
