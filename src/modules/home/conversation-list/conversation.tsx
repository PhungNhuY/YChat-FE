import clsx from 'clsx';
import styles from './conversation.module.css';
import { Avatar } from 'antd';
import { EConversationType, IConversation, IUser } from '../../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuth } from '../../../hooks';
dayjs.extend(relativeTime);

function genConversationName(conversation: IConversation, user: IUser): string {
  if (conversation.name) {
    return conversation.name;
  }
  if (conversation.type === EConversationType.ONE_TO_ONE) {
    return (conversation.members[0].user as IUser)._id === user._id
      ? (conversation.members[1].user as IUser).name
      : (conversation.members[0].user as IUser).name;
  } else {
    return conversation.members.map((m) => (m.user as IUser).name).join(', ');
  }
}

export function Conversation({ data }: { data: IConversation }) {
  const { user }: { user: IUser } = useAuth();
  return (
    <div
      className={clsx(
        styles.wrapper,
        'd-flex justify-content-between align-items-center gap-2',
      )}
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
