export const createGameObject = () => {
  return {
    id: Math.random(), // TODO: change to something that can be tested
  };
};

export const createOwnedGameObject = (ownerId: string) => {
  return {
    ...createGameObject(),
    ownerId,
  };
};
export type GameObject = ReturnType<typeof createGameObject>;
export type OwnedGameObject = ReturnType<typeof createOwnedGameObject>;
