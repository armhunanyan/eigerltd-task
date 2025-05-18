import { ActionType, SendSMSPayload } from '../types/action.types';
import { Action } from './Action';

export class SendSMS implements Action {
  constructor(public phoneNumber: string) {}

  async execute() {
    console.log(`Sending SMS to: ${this.phoneNumber}`);
  }

  toJSON(): SendSMSPayload {
    return {
      type: ActionType.SEND_SMS,
      phoneNumber: this.phoneNumber,
    };
  }

  static fromJSON(json: SendSMSPayload): SendSMS {
    return new SendSMS(json.phoneNumber);
  }
}