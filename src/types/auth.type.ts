export interface IForgotPassword {
  email: string;
}

export interface Ilogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  DOB?: Date;
  gender?: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}

export enum ETokenType {
  ACTIVATION = 1,
  FORGOT_PASSWORD = 2,
}
