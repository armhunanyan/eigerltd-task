export enum ActionType {
	SEND_SMS = 'SendSMS',
	SEND_EMAIL = 'SendEmail',
	CONDITION = 'Condition',
	LOOP = 'Loop',
}

export interface BaseActionPayload {
  type: ActionType;
  next?: ActionPayload;
}

export interface SendSMSPayload extends BaseActionPayload {
	type: ActionType.SEND_SMS;
  phoneNumber: string;
};

export interface SendEmailPayload extends BaseActionPayload {
	type: ActionType.SEND_EMAIL;
  sender: string;
  receiver: string;
};

export interface ConditionPayload extends BaseActionPayload {
	type: ActionType.CONDITION;
  expression: string;
  trueAction?: ActionPayload;
  falseAction?: ActionPayload;
};

export interface LoopPayload extends BaseActionPayload {
	type: ActionType.LOOP;
  times: number;
  action: ActionPayload;
};

export type ActionPayload =
  | SendSMSPayload
  | SendEmailPayload
  | ConditionPayload
  | LoopPayload;