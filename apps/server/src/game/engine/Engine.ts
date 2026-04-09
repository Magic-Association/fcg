import { GameAction, GameActionContext } from "@engine/gameAction.js";
import { GameState } from "@engine/GameState.js";

export default class Engine {
  private state: GameState;

  constructor(initialState: GameState) {
    this.state = initialState;
  }

  apply(action: GameAction, context: GameActionContext = {}) {
    const result = action(this.state, context);
    this.state = result.state;
    return result;
  }
}
