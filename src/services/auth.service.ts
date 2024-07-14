import axios from 'axios';
import { Ilogin, IUser } from '../types';
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
