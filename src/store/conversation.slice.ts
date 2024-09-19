import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IGetConversationsParams } from '../types';
import { getConversations } from '../services';

export interface IConversationState {
  conversations: Array<IConversation>;
  loading: boolean;
}

const initialState: IConversationState = {
  conversations: [],
  loading: false,
};

export const getConversationsThunk = createAsyncThunk(
  'conversations/get',
  async (params: IGetConversationsParams) => {
    return (await getConversations(params.page ?? 1, params.limit ?? 20)) ?? [];
  },
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<Array<IConversation>>) => {
      state.conversations.unshift(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationsThunk.fulfilled, (state, action) => {
        action.payload.forEach((c) => {
          if (!state.conversations.some((c2) => c2._id === c._id)) {
            state.conversations.push(c);
          }
        });
        state.loading = false;
      })
      .addCase(getConversationsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { addConversations } = conversationSlice.actions;
export default conversationSlice.reducer;
