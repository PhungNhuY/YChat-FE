import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFriendship, IGetFriendshipsParams } from '../types';
import { getReceivedRequest } from '../services';

export interface IReceivedRequestState {
  requests: Array<IFriendship>;
  page: number;
  total: number;
  numberOfPages: number;
  loading: boolean;
}

const initialState: IReceivedRequestState = {
  requests: [],
  page: 1,
  numberOfPages: 1,
  total: 0,
  loading: false,
};

export const getReceivedRequestThunk = createAsyncThunk(
  'receivedRequest/get',
  async (params: IGetFriendshipsParams) => {
    return (
      (await getReceivedRequest(params.page ?? 1, params.limit ?? 20)) ?? {
        items: [],
        total: 0,
      }
    );
  },
);

export const receivedRequestSlice = createSlice({
  name: 'receivedRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceivedRequestThunk.fulfilled, (state, action) => {
        state.requests = action.payload.items;
        state.numberOfPages = Math.ceil(action.payload.total / 20);
        state.loading = false;
        state.total = action.payload.total;
      })
      .addCase(getReceivedRequestThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

// export const {} = receivedRequestSlice.actions;
export default receivedRequestSlice.reducer;
