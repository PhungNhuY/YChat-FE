import { IUser } from './user.type';

export enum EMessageType {
  TEXT = 1,
  FIlE = 2,
}

export interface IMessage {
  user: IUser;
  conversation: string;
  type: EMessageType;
  content: string;
  createdAt: Date;
}
