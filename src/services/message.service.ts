import axios from 'axios';
import {
  EMessageType,
  IApiResponse,
  IMessage,
  IMultiItemsResponse,
} from '../types';
import { axiosErrorHandler, axiosService } from './axios.service';
import { FETCH_MESSAGES_LIMIT } from '../constants';

const messagesCache = new Map<string, Array<IMessage>>();
export const allMessagesLoaded = new Map<string, boolean>();

export async function getMessages(
  conversationId: string,
  before?: string,
): Promise<Array<IMessage> | null> {
  if (!before) {
    // get cached messages
    const cachedMessages = messagesCache.get(conversationId);
    if (cachedMessages) {
      return cachedMessages;
    }
  }

  // fecth messages
  try {
    const response = (
      await axiosService.get(
        `conversations/${conversationId}/messages?limit=${FETCH_MESSAGES_LIMIT}${before ? `&before=${before}` : ''}`,
      )
    ).data as IApiResponse<IMessage>;
    const { items: messages } = response.data as IMultiItemsResponse<IMessage>;

    // cache messages
    if (messagesCache.has(conversationId)) {
      const cachedMessages = messagesCache.get(conversationId)!;
      messages.forEach((m) => {
        // add the message if it doesn't exist in the list
        if (!cachedMessages.some((m2) => m2._id === m._id)) {
          cachedMessages.push(m);
        }
      });
    } else {
      messagesCache.set(conversationId, messages);
    }

    return messages;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    return null;
  }
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

export async function addNewMessage(conversationId: string, message: IMessage) {
  const messages = messagesCache.get(conversationId);
  if (messages) {
    messages.unshift(message);
  } else {
    messagesCache.set(conversationId, [message]);
  }
}

export async function markConversationLoadedAllMessage(conversationId: string) {
  allMessagesLoaded.set(conversationId, true);
}
