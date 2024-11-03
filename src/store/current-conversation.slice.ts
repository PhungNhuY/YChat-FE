import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IGetMessagesParams, IMessage, IUser } from '../types';
import { getMessages } from '../services';
import { RootState } from '.';

export interface ICurrentConversationState {
  conversation: IConversation | null;
  messages: Array<IMessage>;
  loadingMessages: boolean;
}

const initialState: ICurrentConversationState = {
  conversation: null,
  messages: [],
  loadingMessages: false,
};

export const getMessagesThunk = createAsyncThunk(
  'currentConversation/getMessages',
  async (params: IGetMessagesParams) => {
    return (await getMessages(params.conversartionId)) ?? [];
  },
);

export const loadMoreMessagesThunk = createAsyncThunk(
  'currentConversation/loadMoreMessages',
  async (_, { getState }) => {
    const currentConversation = (getState() as RootState).currentConversation;
    if (currentConversation.conversation) {
      const oldestMessage =
        currentConversation.messages[currentConversation.messages.length - 1];
      return await getMessages(
        currentConversation.conversation._id,
        oldestMessage ? oldestMessage.createdAt : undefined,
      );
    }
  },
);

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<IConversation>) => {
      state.conversation = action.payload;
      state.messages = initialState.messages;
      state.loadingMessages = initialState.loadingMessages;
    },
    addNewMessageToCurrentConversation: (
      state,
      action: PayloadAction<IMessage>,
    ) => {
      const newMessage = action.payload;
      newMessage.user = (newMessage.user as IUser)._id;
      if (state.conversation?._id === action.payload.conversation) {
        state.messages.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // get messages
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        action.payload.forEach((m) => {
          // add the message if it doesn't exist in the list
          if (!state.messages.some((m2) => m2._id === m._id)) {
            state.messages.push(m);
          }
        });
        state.loadingMessages = false;
      })
      .addCase(getMessagesThunk.pending, (state) => {
        state.loadingMessages = true;
      })

      // load more messages
      .addCase(loadMoreMessagesThunk.fulfilled, (state, action) => {
        action.payload?.forEach((m) => {
          // add the message if it doesn't exist in the list
          if (!state.messages.some((m2) => m2._id === m._id)) {
            state.messages.push(m);
          }
        });
        state.loadingMessages = false;
      })
      .addCase(loadMoreMessagesThunk.pending, (state) => {
        state.loadingMessages = true;
      });
  },
});

export const { setCurrentConversation, addNewMessageToCurrentConversation } =
  currentConversationSlice.actions;
export default currentConversationSlice.reducer;
