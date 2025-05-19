import { Action } from "./Action";
import { ActionType, ConditionPayload } from "../types/action.types";
import { ActionFactory } from "../factories/ActionFactory";

export class Condition implements Action {
  constructor(
    public expression: string,
    public trueAction?: Action,
    public falseAction?: Action
  ) {}

  async execute(context: any = {}) {
    const func = new Function(
      ...Object.keys(context),
      `return ${this.expression};`
    );
    const result = func(...Object.values(context));
    if (result) {
      await this.trueAction?.execute(context);
    } else {
      await this.falseAction?.execute(context);
    }
  }

  toJSON(): ConditionPayload {
    return {
      type: ActionType.CONDITION,
      expression: this.expression,
      trueAction: this.trueAction?.toJSON(),
      falseAction: this.falseAction?.toJSON(),
    };
  }

  static fromJSON(json: ConditionPayload): Condition {
    return new Condition(
      json.expression,
      json.trueAction ? ActionFactory.fromJSON(json.trueAction) : undefined,
      json.falseAction ? ActionFactory.fromJSON(json.falseAction) : undefined
    );
  }
}
