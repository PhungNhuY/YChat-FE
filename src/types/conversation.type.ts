import { IMessage } from './message.type';
import { IUser } from './user.type';

export enum EMemberRole {
  MEMBER = 1,
  ADMIN = 2,
}

export interface IMember {
  user: string | IUser;
  role: EMemberRole;
  nickname?: string;
  lastSeen?: number;
}

export enum EConversationType {
  ONE_TO_ONE = 1,
  GROUP = 2,
}

export interface IConversation {
  _id: string;
  type: EConversationType;
  name?: string;
  members: Array<IMember>;
  color?: string;
  avatar?: string;
  lastMessage?: IMessage;
}

export interface IGetConversationsParams {
  page?: number;
  limit?: number;
}
