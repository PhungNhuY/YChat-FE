import axios from 'axios';
import { ETokenType, Ilogin, IRegister, IUser } from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function login(loginData: Ilogin): Promise<IUser | null> {
  try {
    const response = (await axiosService.post('/auth/login', loginData)).data;
    const user = response.data as IUser;
    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
  return null;
}

export async function logout() {
  await axiosService.post('auth/logout');
}

export async function register(data: IRegister) {
  try {
    await axiosService.post('/auth/register', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
}

export async function activateAccount(
  userId: string,
  tokenId: string,
  tokenValue: string,
  onSuccess: () => void,
) {
  try {
    await axiosService.post(`/auth/activate`, {
      uid: userId,
      tid: tokenId,
      tv: tokenValue,
    });
    onSuccess();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
}

export async function forgotPassword(email: string, onSuccess: () => void) {
  try {
    await axiosService.post(`/auth/forgot-password`, { email });
    onSuccess();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
}

export async function validateToken(
  userId: string,
  tokenId: string,
  tokenValue: string,
  onFailure: () => void,
) {
  try {
    const response = await axiosService.get(
      `/auth/user-from-token?uid=${userId}&tid=${tokenId}&tv=${tokenValue}&tokenType=${ETokenType.FORGOT_PASSWORD}`,
    );
    const email = response.data.data.email;
    return email;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    onFailure();
  }
}

export async function resetPassword(
  userId: string,
  tokenId: string,
  tokenValue: string,
  password: string,
  onSuccess: () => void,
) {
  try {
    await axiosService.post(`/auth/reset-password`, {
      uid: userId,
      tid: tokenId,
      tv: tokenValue,
      password,
    });
    onSuccess();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
}
