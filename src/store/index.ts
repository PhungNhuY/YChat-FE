import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversations.slice';
import currentConversationReducer from './current-conversation.slice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    currentConversation: currentConversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
