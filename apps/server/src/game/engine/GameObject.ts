import { randomUUID } from "node:crypto";

export type GameObject = {
  id: string;
};

export type OwnedGameObject = GameObject & {
  ownerId: string;
};

export const createGameObject = (): GameObject => {
  return {
    id: randomUUID(),
  };
};

export const createOwnedGameObject = (ownerId: string): OwnedGameObject => {
  return {
    ...createGameObject(),
    ownerId,
  };
};
