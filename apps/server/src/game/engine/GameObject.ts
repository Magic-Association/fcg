import { Character } from "@engine/GameState.js";

export const createGameObject = () => {
  return {
    id: crypto.randomUUID(),
  };
};

export const createOwnedGameObject = (owner: Character) => {
  return {
    ...createGameObject(),
    owner,
  };
};
export type GameObject = ReturnType<typeof createGameObject>;
export type OwnedGameObject = ReturnType<typeof createOwnedGameObject>;
