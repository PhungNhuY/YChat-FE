import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation, IMessage } from '../types';

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

export const currentConversationSlice = createSlice({
  name: 'currentConversation',
  initialState,
  reducers: {
    setCurrentConversation: (state, action: PayloadAction<IConversation>) => {
      state.conversation = action.payload;
    },
  },
});

export const { setCurrentConversation } = currentConversationSlice.actions;
export default currentConversationSlice.reducer;
