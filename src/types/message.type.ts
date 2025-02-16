import { IUser } from './user.type';

export enum EMessageType {
  TEXT = 1,
  FIlE = 2,
  NOTIFICATION = 3,
}

export interface IMessage {
  _id: string;
  user: string | IUser;
  conversation: string;
  type: EMessageType;
  content: string;
  createdAt: string;
}

export interface IGetMessagesParams {
  conversartionId: string;
}
