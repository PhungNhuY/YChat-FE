import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IGetConversationsParams, IMessage } from '../types';
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
    conversationHasNewMessage: (state, action: PayloadAction<IMessage>) => {
      const newMessage = action.payload;
      const conversation = state.conversations.find(
        (c) => c._id === newMessage.conversation,
      );
      // take to the top of the list
      if (conversation) {
        // set last message
        conversation.lastMessage = newMessage;
        // remove conversation from the list
        state.conversations = state.conversations.filter(
          (c) => c._id !== newMessage.conversation,
        );
        // add conversation to the top of the list
        state.conversations.unshift(conversation);
      } else {
        // conversation is not in the current list -> fetch and add to list
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationsThunk.fulfilled, (state, action) => {
        action.payload.forEach((c) => {
          // add the conversation if it doesn't exist in the list
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

export const { addConversations, conversationHasNewMessage } =
  conversationSlice.actions;
export default conversationSlice.reducer;
