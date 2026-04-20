import { GameAction } from "@engine/gameAction.js";
import { GameState } from "@engine/GameState.js";

export default class Engine {
  #state: GameState;

  constructor(initialState: GameState) {
    this.#state = initialState;
  }

  apply(action: GameAction) {
    const result = action(this.#state);
    this.#state = result.state;
    return result;
  }

  get state() {
    return this.#state;
  }
}
