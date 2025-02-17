import { combineReducers, configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversations.slice';
import currentConversationReducer from './current-conversation.slice';
import receivedRequestReducer from './received-request.slice';

export const RESET_STATE = 'RESET_STATE';

const rootReducer = combineReducers({
  conversation: conversationReducer,
  currentConversation: currentConversationReducer,
  receivedRequest: receivedRequestReducer,
});

const rootReducerWithReset = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    // reset state
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducerWithReset,
});

// reset store action
export const resetStore = () => ({ type: RESET_STATE });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './hooks';
export * from './conversations.slice';
export * from './current-conversation.slice';
export * from './received-request.slice';
