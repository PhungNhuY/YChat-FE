import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IFriendship,
  IGetFriendshipsParams,
  IMultiItemsResponse,
} from '../types';
import { acceptRequest, getReceivedRequest } from '../services';
import { RootState } from '.';

export interface IReceivedRequestState {
  requests: Array<IFriendship>;
  page: number;
  total: number;
  numberOfPages: number;
  loading: boolean;
  accepting: Array<string>;
  declining: Array<string>;
}

const initialState: IReceivedRequestState = {
  requests: [],
  page: 1,
  numberOfPages: 0,
  total: 0,
  loading: false,
  accepting: [],
  declining: [],
};

export const getReceivedRequestThunk = createAsyncThunk(
  'receivedRequest/get',
  async (params: IGetFriendshipsParams) => {
    return await getReceivedRequest(params.page ?? 1, params.limit ?? 20);
  },
);

export const loadMoreReceivedRequestThunk = createAsyncThunk(
  'receivedRequest/loadMore',
  async (_, { getState }) => {
    const receivedRequest = (getState() as RootState).receivedRequest;
    if (receivedRequest.page + 1 > receivedRequest.numberOfPages) return [];
    return await getReceivedRequest(receivedRequest.page + 1);
  },
);

export const acceptRequestThunk = createAsyncThunk(
  'receivedRequest/accept',
  async (friendshipId: string) => {
    await acceptRequest(friendshipId);
  },
);

export const receivedRequestSlice = createSlice({
  name: 'receivedRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceivedRequestThunk.fulfilled, (state, action) => {
        const res = action.payload as IMultiItemsResponse<IFriendship>;
        state.requests = res.items;
        state.numberOfPages = Math.ceil(res.total / 20);
        state.loading = false;
        state.total = res.total;
      })
      .addCase(getReceivedRequestThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReceivedRequestThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadMoreReceivedRequestThunk.fulfilled, (state, action) => {
        const res = action.payload as IMultiItemsResponse<IFriendship>;
        state.requests = [...state.requests, ...res.items];
        state.numberOfPages = Math.ceil(res.total / 20);
        state.loading = false;
        state.total = res.total;
        state.page = state.page + 1;
      })
      .addCase(loadMoreReceivedRequestThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMoreReceivedRequestThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(acceptRequestThunk.fulfilled, (state, action) => {
        const requestId = action.meta.arg;
        state.requests = state.requests.filter((r) => r._id !== requestId);
        state.accepting = state.accepting.filter((r) => r !== requestId);
      })
      .addCase(acceptRequestThunk.pending, (state, action) => {
        const requestId = action.meta.arg;
        state.accepting.push(requestId);
      })
      .addCase(acceptRequestThunk.rejected, (state, action) => {
        const requestId = action.meta.arg;
        state.accepting = state.accepting.filter((r) => r !== requestId);
      });
  },
});

// export const {} = receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;
