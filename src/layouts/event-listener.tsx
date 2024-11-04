import { useContext, useEffect } from 'react';
import { SocketContext } from '../services/socket.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { conversationHasNewMessage } from '../store/conversations.slice';
import { IMessage } from '../types';
import { addNewMessage } from '../services';
import { ON_MESSAGE } from '../constants/socket';
import { addNewMessageToCurrentConversation } from '../store/current-conversation.slice';

export function EventListener() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on(ON_MESSAGE, (newMessage: IMessage) => {
      //   set last message
      dispatch(addNewMessageToCurrentConversation(newMessage));
      dispatch(conversationHasNewMessage(newMessage));
      // save message to cache
      addNewMessage(newMessage.conversation, newMessage);
    });

    return () => {
      socket.off(ON_MESSAGE);
    };
  }, []);
  return null;
}
