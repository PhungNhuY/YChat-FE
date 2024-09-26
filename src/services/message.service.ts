import axios from 'axios';
import { IApiResponse, IMessage, IMultiItemsResponse } from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getMessages(
  projectId: string,
  page: number,
): Promise<Array<IMessage> | null> {
  const limit = 20;
  try {
    const response = (
      await axiosService.get(
        `/messages/${projectId}?page=${page}&limit=${limit}`,
      )
    ).data as IApiResponse<IMessage>;
    const { items: messages } = response.data as IMultiItemsResponse<IMessage>;
    return messages;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
  return null;
}
