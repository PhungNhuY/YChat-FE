import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EConversationType,
  EMessageType,
  EUserStatus,
  IConversation,
} from '../types';

export interface IConversationState {
  conversations: Array<IConversation>;
}

const initialState: IConversationState = {
  conversations: [
    {
      _id: '123',
      type: EConversationType.ONE_TO_ONE,
      members: [],
      lastMessage: {
        user: {
          name: 'john',
          email: '',
          _id: '1',
          status: EUserStatus.ACTIVATED,
        },
        conversation: '1',
        type: EMessageType.TEXT,
        content: 'hello',
        createdAt: new Date(),
      },
    },
  ],
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
