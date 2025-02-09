import axios from 'axios';
import { Ilogin, IRegister, IUser } from '../types';
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
  await axiosService.get('auth/logout');
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
