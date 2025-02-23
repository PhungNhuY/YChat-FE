import { Card } from 'antd';
import { IFriendship, IUser } from '../../types';
import clsx from 'clsx';
import styles from './friend-card.module.css';
import { useAuth } from '../../hooks';
import { BiSolidUser } from 'react-icons/bi';

export function FriendCard({ friendship }: { friendship: IFriendship }) {
  const { user }: { user: IUser } = useAuth();
  const friend =
    (friendship.sender as IUser)._id === user._id
      ? (friendship.receiver as IUser)
      : (friendship.sender as IUser);
  return (
    <Card
      className={clsx(styles.card, 'friend-card')}
      cover={
        friend.avatar ? (
          <img src={friend.avatar} className={clsx(styles.avatar)} />
        ) : (
          <div className={clsx(styles.avatar, styles.defaultAvatar)}>
            <BiSolidUser className={clsx(styles.defaultAvatarIcon)} />
          </div>
        )
      }
    >
      <span className={clsx('friend-card-name', styles.name)}>
        {friend.name}
      </span>
    </Card>
  );
}
