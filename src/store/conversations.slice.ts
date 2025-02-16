import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IMessage } from '../types';
import { getConversations } from '../services';
import { RootState } from '.';

const pageSize = 20;

export interface IConversationState {
  conversations: Array<IConversation>;
  loading: boolean;
  // allConversationsLoaded: boolean;
  firstLoadExecuted: boolean;
  page: number;
  total: number;
}

const initialState: IConversationState = {
  conversations: [],
  loading: false,
  // allConversationsLoaded: false,
  firstLoadExecuted: false,
  page: 1,
  total: 0,
};

export const getConversationsThunk = createAsyncThunk(
  'conversations/get',
  async () => {
    return (await getConversations(1, pageSize)) ?? [[], 0];
  },
);

export const loadMoreConversationsThunk = createAsyncThunk(
  'conversations/loadMore',
  async (_, { getState }) => {
    const currentPage = (getState() as RootState).conversation.page;
    const total = (getState() as RootState).conversation.total;
    if (currentPage < Math.ceil(total / pageSize)) {
      return (await getConversations(currentPage + 1, pageSize)) ?? [[], 0];
    } else {
      return [[], total];
    }
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
      // get conversations
      .addCase(getConversationsThunk.fulfilled, (state, action) => {
        const [conversations, total] = action.payload as [
          Array<IConversation>,
          number,
        ];
        conversations.forEach((c) => {
          // add the conversation if it doesn't exist in the list
          if (!state.conversations.some((c2) => c2._id === c._id)) {
            state.conversations.push(c);
          }
        });
        state.total = total;
        state.loading = false;
        state.firstLoadExecuted = true;
      })
      .addCase(getConversationsThunk.pending, (state) => {
        state.loading = true;
      })

      // load more conversations
      .addCase(loadMoreConversationsThunk.fulfilled, (state, action) => {
        const [conversations, total] = action.payload as [
          Array<IConversation>,
          number,
        ];
        conversations.forEach((c) => {
          // add the conversation if it doesn't exist in the list
          if (!state.conversations.some((c2) => c2._id === c._id)) {
            state.conversations.push(c);
          }
        });
        state.total = total;
        state.loading = false;
        state.page = state.page + 1;
      })
      .addCase(loadMoreConversationsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { addConversations, conversationHasNewMessage } =
  conversationSlice.actions;
export default conversationSlice.reducer;
