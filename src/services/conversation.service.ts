import axios from 'axios';
import { IApiResponse, IConversation, IMultiItemsResponse } from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getConversations(
  page: number,
  limit: number,
): Promise<[Array<IConversation>, number] | null> {
  try {
    const response = (
      await axiosService.get(`/conversations?page=${page}&limit=${limit}`)
    ).data as IApiResponse<IConversation>;
    const { items, total } =
      response.data as IMultiItemsResponse<IConversation>;
    return [items, total];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
  return null;
}
