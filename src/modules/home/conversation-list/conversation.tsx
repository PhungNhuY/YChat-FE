import clsx from 'clsx';
import styles from './conversation.module.css';
import { Avatar } from 'antd';
import { IConversation, IUser } from '../../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuth } from '../../../hooks';
import { AppDispatch, useAppSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import {
  getMessagesThunk,
  setCurrentConversation,
} from '../../../store/current-conversation.slice';
import { genConversationName } from '../../../utils/conversation';
import { useContext } from 'react';
import { SocketContext } from '../../../services/socket.service';
import { globalValues } from '../../../utils';
dayjs.extend(relativeTime);

export function Conversation({ data }: { data: IConversation }) {
  const { user }: { user: IUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation,
  );
  const socket = useContext(SocketContext);

  const onCLickConversation = () => {
    // socket must be connected before load messages
    if (!socket.connected) {
      globalValues.messageApi?.error('You are offline!');
      return;
    }

    // load messages
    if (data._id !== currentConversation?._id) {
      dispatch(setCurrentConversation(data));
      dispatch(
        getMessagesThunk({
          conversartionId: data._id,
        }),
      );
    }
  };

  return (
    <div
      className={clsx(
        styles.wrapper,
        data._id === currentConversation?._id && styles.active,
        'd-flex justify-content-between align-items-center gap-2',
      )}
      onClick={onCLickConversation}
    >
      <Avatar size={46} className="flex-fixed-size" />
      <div className="flex-expanding-size">
        <span>{genConversationName(data, user)}</span>
        <div className="">
          {data.lastMessage && (
            <>
              <span>{data.lastMessage.content}</span>
              <span> &#8901; </span>
              <span>{dayjs(data.lastMessage.createdAt).fromNow(true)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
