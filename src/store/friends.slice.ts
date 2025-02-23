import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IFriendship,
  IGetFriendshipsParams,
  IMultiItemsResponse,
} from '../types';
import { getFriends } from '../services';
import { RootState } from '.';

export interface IFriendsState {
  friends: Array<IFriendship>;
  page: number;
  total: number;
  numberOfPages: number;
  loading: boolean;
}

const initialState: IFriendsState = {
  friends: [],
  page: 1,
  total: 0,
  numberOfPages: 0,
  loading: false,
};

export const getFriendsThunk = createAsyncThunk(
  'friends/get',
  async (params: IGetFriendshipsParams) => {
    return await getFriends(params.page ?? 1, params.limit ?? 20);
  },
);

export const loadMoreFriendsThunk = createAsyncThunk(
  'receivedRequest/loadMore',
  async (_, { getState }) => {
    const friendsState = (getState() as RootState).friends;
    if (friendsState.page + 1 > friendsState.numberOfPages) return [];
    return await getFriends(friendsState.page + 1);
  },
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsThunk.fulfilled, (state, action) => {
        const res = action.payload as IMultiItemsResponse<IFriendship>;
        state.friends = res.items;
        state.total = res.total;
        state.numberOfPages = Math.ceil(res.total / 20);
        state.loading = false;
      })
      .addCase(getFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriendsThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadMoreFriendsThunk.fulfilled, (state, action) => {
        const res = action.payload as IMultiItemsResponse<IFriendship>;
        state.friends = [...state.friends, ...res.items];
        state.total = res.total;
        state.numberOfPages = Math.ceil(res.total / 20);
        state.loading = false;
        state.page = state.page + 1;
      })
      .addCase(loadMoreFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreFriendsThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const {} = friendsSlice.actions;
export default friendsSlice.reducer;
