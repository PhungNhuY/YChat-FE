import { IUser } from './user.type';

export enum EMessageType {
  TEXT = 1,
  FIlE = 2,
}

export interface IMessage {
  _id: string;
  user: IUser;
  conversation: string;
  type: EMessageType;
  content: string;
  createdAt: Date;
}

export interface IGetMessagesParams {
  projectId: string;
  page: number;
}
