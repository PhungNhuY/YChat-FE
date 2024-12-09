import axios from 'axios';
import { IApiResponse, IFriendship, IMultiItemsResponse } from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getReceivedRequest(
  page = 1,
  limit = 20,
): Promise<IMultiItemsResponse<IFriendship>> {
  try {
    const response = (
      await axiosService.get(
        `/friendships/requests/received?page=${page}&limit=${limit}`,
      )
    ).data as IApiResponse<IFriendship>;
    return response.data as IMultiItemsResponse<IFriendship>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    throw error;
  }
}
