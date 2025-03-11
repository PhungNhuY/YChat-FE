import axios from 'axios';
import {
  IApiResponse,
  IMultiItemsResponse,
  IUserWithFriendshipStatus,
} from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getUsers(
  q: string,
  page = 1,
  limit = 20,
): Promise<IMultiItemsResponse<IUserWithFriendshipStatus>> {
  try {
    const response = (
      await axiosService.get(`/users?page=${page}&limit=${limit}&q=${q}`)
    ).data as IApiResponse<IUserWithFriendshipStatus>;
    return response.data as IMultiItemsResponse<IUserWithFriendshipStatus>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    return {
      items: [],
      total: 0,
    };
  }
}
