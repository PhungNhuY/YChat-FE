import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConversation } from '../types';

export interface IConversationState {
  conversations: Array<IConversation>;
}

const initialState: IConversationState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<Array<IConversation>>) => {
      state.conversations.unshift(...action.payload);
    },
  },
});

export const { addConversations } = conversationSlice.actions;
export default conversationSlice.reducer;
