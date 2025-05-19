import { Action } from "./Action";
import { ActionType, LoopPayload } from "../types/action.types";
import { ActionFactory } from "../factories/ActionFactory";

export class Loop implements Action {
  constructor(public times: number, public action: Action) {}

  async execute(context: any = {}) {
    for (let i = 0; i < this.times; i++) {
      await this.action.execute(context);
    }
  }

  toJSON(): LoopPayload {
    return {
      type: ActionType.LOOP,
      times: this.times,
      action: this.action.toJSON(),
    };
  }

  static fromJSON(json: LoopPayload): Loop {
    return new Loop(json.times, ActionFactory.fromJSON(json.action));
  }
}
