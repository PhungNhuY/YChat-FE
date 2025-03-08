import clsx from 'clsx';
import styles from './conversation.module.css';
import {
  EConversationType,
  EMessageType,
  IConversation,
  IUser,
} from '../../../types';
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
import { Avatar } from '../../../components';
import { Avatar as AntdAvatar } from 'antd';
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
      {data.type === EConversationType.ONE_TO_ONE && (
        <Avatar
          size={46}
          className="flex-fixed-size"
          avatar={
            (
              data.members.find((m) => (m.user as IUser)._id !== user._id)
                ?.user as IUser
            ).avatar
          }
          username={
            (
              data.members.find((m) => (m.user as IUser)._id !== user._id)
                ?.user as IUser
            ).name
          }
        />
      )}
      {data.type === EConversationType.GROUP && (
        <AntdAvatar size={46} className="flex-fixed-size" />
      )}
      <div className="flex-expanding-size">
        <span>{genConversationName(data, user)}</span>
        <div className="">
          {data.lastMessage && (
            <>
              {data.lastMessage.type === EMessageType.NOTIFICATION && (
                <span></span>
              )}
              {data.lastMessage.type === EMessageType.TEXT && (
                <span>{data.lastMessage.content}</span>
              )}
              <span> &#8901; </span>
              <span>{dayjs(data.lastMessage.createdAt).fromNow(true)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
