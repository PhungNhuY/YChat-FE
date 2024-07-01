export enum EUserGender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export enum EUserStatus {
  INACTIVATE = 1,
  ACTIVATED = 2,
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  DOB?: Date;
  gender?: EUserGender;
  status: EUserStatus;
}
