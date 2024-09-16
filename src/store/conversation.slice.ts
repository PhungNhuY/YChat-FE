import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation } from '../types';
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
  async () => {
    return (await getConversations()) ?? [];
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
        state.conversations = action.payload;
        state.loading = false;
      })
      .addCase(getConversationsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { addConversations } = conversationSlice.actions;
export default conversationSlice.reducer;
