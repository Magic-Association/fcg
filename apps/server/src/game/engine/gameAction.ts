import { Draft, produce } from "immer";
import { GameState } from "@engine/GameState.js";
import { GameEvent } from "@engine/GameEvent.js";

export type ActionResult = { state: GameState; events: GameEvent[] };
export type GameAction = (state: GameState) => ActionResult;

export const action =
  (recipe: (draft: Draft<GameState>, emit: (event: GameEvent) => void) => void) =>
  (state: GameState) => {
    const events: GameEvent[] = [];
    const emit = (e: GameEvent) => events.push(e);
    const nextState = produce(state, (draft) => recipe(draft, emit));
    return { state: nextState, events };
  };

export const pipe =
  (...actions: GameAction[]) =>
  (state: GameState) =>
    actions.reduce<ActionResult>(
      (acc, action) => {
        const result = action(acc.state);
        return {
          state: result.state,
          events: [...acc.events, ...result.events],
        };
      },
      { state, events: [] },
    );
