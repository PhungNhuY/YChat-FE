import clsx from 'clsx';
import styles from './conversation.module.css';
import { Avatar } from 'antd';
import { IConversation } from '../../../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function Conversation({ data }: { data: IConversation }) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        'd-flex justify-content-between align-items-center gap-2',
      )}
    >
      <Avatar size={46} className="flex-fixed-size" />
      <div className="flex-expanding-size">
        <span>{data.name || '_'}</span>
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
