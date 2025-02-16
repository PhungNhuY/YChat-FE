import clsx from 'clsx';
import { EConversationType, IMessage, IUser } from '../../../types';
import { useAppSelector } from '../../../store';
import styles from './system-message.module.css';

function BeFriendMessage({ currentUser }: { currentUser: IUser }) {
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );

  if (currentConversation.type !== EConversationType.ONE_TO_ONE) return null;

  const otherUser = currentConversation.members.find(
    (m) => (m.user as IUser)._id !== currentUser._id,
  );
  return (
    <span className={clsx(styles.text)}>
      You and {(otherUser?.user as IUser).name} are now friends
    </span>
  );
}

export function SystemMessage({
  message,
  currentUser,
}: {
  message: IMessage;
  currentUser: IUser;
}) {
  return (
    <div
      className={clsx(
        'w-100 py-1 px-2 d-flex justify-content-center align-items-center',
      )}
    >
      {message.content === '1' && <BeFriendMessage currentUser={currentUser} />}
    </div>
  );
}
