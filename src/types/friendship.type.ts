import { IUser } from './user.type';

export enum EFriendshipStatus {
  REQUESTED = 1,
  ACCEPTED = 2,
  DECLINED = 3,
}

export interface IFriendship {
  _id: string;
  sender: string | IUser;
  receiver: string | IUser;
  status: EFriendshipStatus;
  message?: string;
  acceptedAt?: number;
}

export interface IGetFriendshipsParams {
  page?: number;
  limit?: number;
}
