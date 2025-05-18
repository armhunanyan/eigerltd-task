import { ActionType, SendEmailPayload } from '../types/action.types';
import { Action } from './Action';

export class SendEmail implements Action {
  constructor(public sender: string, public receiver: string) {}

  async execute() {
    console.log(`Sending Email from ${this.sender} to ${this.receiver}`);
  }

  toJSON(): SendEmailPayload {
    return {
      type: ActionType.SEND_EMAIL,
      sender: this.sender,
      receiver: this.receiver,
    };
  }

  static fromJSON(json: SendEmailPayload): SendEmail {
    return new SendEmail(json.sender, json.receiver);
  }
}