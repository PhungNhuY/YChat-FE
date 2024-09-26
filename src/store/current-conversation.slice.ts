import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IGetMessagesParams, IMessage } from '../types';
import { getMessages } from '../services';

export interface ICurrentConversationState {
  conversation: IConversation | null;
  messages: Array<IMessage>;
  loadingMessages: boolean;
  page: 0;
}

const initialState: ICurrentConversationState = {
  conversation: null,
  messages: [],
  loadingMessages: false,
  page: 0,
};

export const getMessagesThunk = createAsyncThunk(
  'currentConversation/getMessages',
  async (params: IGetMessagesParams) => {
    return (await getMessages(params.projectId, params.page)) ?? [];
  },
);

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<IConversation>) => {
      state.conversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        action.payload.forEach((m) => {
          // add the message if it doesn't exist in the list
          if (!state.messages.some((m2) => m2._id === m._id)) {
            state.messages.push(m);
          }
        });
        state.loadingMessages = false;
        state.page += 1;
      })
      .addCase(getMessagesThunk.pending, (state) => {
        state.loadingMessages = true;
      });
  },
});

export const { setCurrentConversation } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;
