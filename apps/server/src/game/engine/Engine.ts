import { GameAction } from "@engine/gameAction.js";
import { GameState } from "@engine/GameState.js";

export default class Engine {
  private state: GameState;

  constructor(initialState: GameState) {
    this.state = initialState;
  }

  apply(action: GameAction) {
    const result = action(this.state);
    this.state = result.state;
    if (result.events?.length) {
      for (const event of result.events) {
        console.log(event.type, event.payload);
      }
    }
  }
}
