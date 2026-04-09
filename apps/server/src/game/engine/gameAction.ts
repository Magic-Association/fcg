import { Draft, produce } from "immer";
import { GameState } from "@engine/GameState.js";
import { GameEvent } from "@engine/GameEvent.js";

export type ActionResult = { state: GameState; events: GameEvent[] };
export type GameActionContext = {
  sourceCharacterId?: string;
};

export type GameAction = (state: GameState, context: GameActionContext) => ActionResult;

export const action =
  (
    recipe: (
      draft: Draft<GameState>,
      emit: (event: GameEvent) => void,
      context: GameActionContext,
    ) => void,
  ) =>
  (state: GameState, context: GameActionContext) => {
    const events: GameEvent[] = [];
    const emit = (e: GameEvent) => events.push(e);
    const nextState = produce(state, (draft) => recipe(draft, emit, context));
    return { state: nextState, events };
  };

export const pipe =
  (...actions: GameAction[]) =>
  (state: GameState, context: GameActionContext) =>
    actions.reduce<ActionResult>(
      (acc, gameAction) => {
        const result = gameAction(acc.state, context);
        return {
          state: result.state,
          events: [...acc.events, ...result.events],
        };
      },
      { state, events: [] },
    );
