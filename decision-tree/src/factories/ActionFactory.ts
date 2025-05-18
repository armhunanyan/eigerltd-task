import { Action } from '../actions/Action';
import { SendSMS } from '../actions/SendSms';
import { SendEmail } from '../actions/SendEmail';
import { Condition } from '../actions/Condition';
import { Loop } from '../actions/Loop';
import { ActionPayload, ActionType } from '../types/action.types';

export class ActionFactory {
  static fromJSON(json: ActionPayload): Action {
		let action: Action;
    switch (json.type) {
      case ActionType.SEND_SMS:
				action = SendSMS.fromJSON(json);
				break;
      case ActionType.SEND_EMAIL:
				action = SendEmail.fromJSON(json);
				break;
      case ActionType.CONDITION:
				action = Condition.fromJSON(json);
				break;
      case ActionType.LOOP:
				action = Loop.fromJSON(json);
				break;
      default:
				throw new Error("Unknown action type");
    }

		if (json.next) {
      action.next = ActionFactory.fromJSON(json.next);
    }

		return action
  }
}