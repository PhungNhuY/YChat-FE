import clsx from 'clsx';
import { IMessage, IUser } from '../../../types';
import { Avatar, Tooltip } from 'antd';
import styles from './user-message.module.css';

export function UserMessage({
  message,
  currentUser,
  author,
  isOne2One,
}: {
  message: IMessage;
  currentUser: IUser;
  author: IUser;
  isOne2One: boolean;
}) {
  const mine = currentUser._id === author?._id;
  return (
    <div
      className={clsx(
        'w-100 py-1 px-2 d-flex justify-content-start align-items-end',
        mine && 'flex-row-reverse',
      )}
    >
      {/* avatar */}
      {!mine && (
        <div
          className="me-2"
          style={{ width: 28, height: 28, marginBottom: 2 }}
        >
          <Avatar size={28} />
        </div>
      )}

      {/* content */}
      <div className="d-flex flex-column align-items-start">
        {!mine && !isOne2One && (
          <span className={clsx(styles.author)}>{author?.name}</span>
        )}
        <Tooltip
          title={'10:23'}
          arrow={false}
          placement="left"
          mouseEnterDelay={0.5}
        >
          <div className={clsx(styles.content, mine && styles.content_mine)}>
            {message.content}
          </div>
        </Tooltip>
      </div>

      {/* functional buttons */}
      <div className=""></div>
    </div>
  );
}
