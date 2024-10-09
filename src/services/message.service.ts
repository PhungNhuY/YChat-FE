import axios from 'axios';
import {
  EMessageType,
  IApiResponse,
  IMessage,
  IMultiItemsResponse,
} from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';
import { SessionStorageService } from './session-storage.service';

export async function getMessages(
  conversationId: string,
  before?: string,
): Promise<Array<IMessage> | null> {
  if (!before) {
    // get cached messages
    const cachedMessages = SessionStorageService.getObject<Array<IMessage>>(
      `messages:${conversationId}`,
    );
    if (cachedMessages) {
      return cachedMessages;
    }
  }

  // fecth messages
  const limit = 20;
  try {
    const response = (
      await axiosService.get(
        `conversations/${conversationId}/messages?limit=${limit}${before ? `&before=${before}` : ''}`,
      )
    ).data as IApiResponse<IMessage>;
    const { items: messages } = response.data as IMultiItemsResponse<IMessage>;

    // cache messages
    const cachedMessages = SessionStorageService.getObject<Array<IMessage>>(
      `messages:${conversationId}`,
    );
    if (Array.isArray(cachedMessages)) {
      messages.forEach((m) => {
        // add the message if it doesn't exist in the list
        if (!cachedMessages.some((m2) => m2._id === m._id)) {
          cachedMessages.push(m);
        }
      });
    } else {
      SessionStorageService.setObject(`messages:${conversationId}`, messages);
    }

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
