import clsx from 'clsx';
import { IMessage, IUser } from '../../../types';
import { Avatar, Tooltip } from 'antd';
import styles from './message.module.css';

export function Message({
  message,
  currentUser,
  author,
}: {
  message: IMessage;
  currentUser: IUser;
  author: IUser;
}) {
  const mine = currentUser._id === author?._id;
  return (
    <div
      className={clsx(
        'w-100 pb-2 px-2 d-flex justify-content-start align-items-center',
        mine && 'flex-row-reverse',
      )}
    >
      {/* avatar */}
      {!mine && (
        <div className="me-2" style={{ width: 28, height: 28 }}>
          <Avatar size={28} />
        </div>
      )}

      {/* content */}
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

      {/* functional buttons */}
      <div className=""></div>
    </div>
  );
}
