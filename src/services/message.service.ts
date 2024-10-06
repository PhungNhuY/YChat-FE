import axios from 'axios';
import {
  EMessageType,
  IApiResponse,
  IMessage,
  IMultiItemsResponse,
} from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';

export async function getMessages(
  conversationId: string,
  page: number,
): Promise<Array<IMessage> | null> {
  const limit = 20;
  try {
    const response = (
      await axiosService.get(
        `conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
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

export async function sendMessage(
  conversationId: string,
  message: string,
): Promise<boolean> {
  try {
    await axiosService.post(`conversations/${conversationId}/messages`, {
      content: message,
      type: EMessageType.TEXT,
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
  }
  return false;
}
