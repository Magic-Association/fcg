import { randomUUID } from "node:crypto";

export type GameObject = {
  id: string;
};

export type OwnedGameObject = GameObject & {
  ownerId: string;
};

export const createGameObjectWithId = (id: string): GameObject => {
  return {
    id,
  };
};

export const createGameObject = (): GameObject => {
  return createGameObjectWithId(randomUUID());
};

export const createOwnedGameObjectWithId = (ownerId: string, id: string): OwnedGameObject => {
  return {
    ...createGameObjectWithId(id),
    ownerId,
  };
};

export const createOwnedGameObject = (ownerId: string): OwnedGameObject => {
  return createOwnedGameObjectWithId(ownerId, randomUUID());
};
