import axios from 'axios';
import {
  EFriendshipStatus,
  IApiResponse,
  IFriendship,
  IMultiItemsResponse,
} from '../types';
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

export async function acceptRequest(friendshipId: string) {
  try {
    await axiosService.patch(
      `friendships/${friendshipId}?status=${EFriendshipStatus.ACCEPTED}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    throw error;
  }
}

export async function declineRequest(friendshipId: string) {
  try {
    await axiosService.patch(
      `friendships/${friendshipId}?status=${EFriendshipStatus.DECLINED}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      axiosErrorHandler(error);
    } else {
      console.log('error:  ', error);
    }
    throw error;
  }
}
