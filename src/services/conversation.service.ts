import axios from 'axios';
import { IApiResponse, IConversation, IMultiItemsResponse } from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getConversations(): Promise<Array<IConversation> | null> {
  try {
    const response = (await axiosService.get('/conversations'))
      .data as IApiResponse<IConversation>;
    const { items: conversations } =
      response.data as IMultiItemsResponse<IConversation>;
    return conversations;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
  return null;
}
