import clsx from 'clsx';
import { useAppSelector, useAuth } from '../../../hooks';
import { Message } from './message';
import { useEffect, useRef } from 'react';
import { IMember, IUser } from '../../../types';

export function Messages() {
  const { user }: { user: IUser } = useAuth();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );
  const messages = useAppSelector(
    (state) => state.currentConversation.messages,
  );
  const memberMap = useRef<Map<string, IUser>>(new Map<string, IUser>());

  useEffect(() => {
    // clear map
    memberMap.current.clear();

    // add memebers to map
    currentConversation.members.forEach((m) => {
      memberMap.current.set(
        ((m as IMember).user as IUser)._id,
        (m as IMember).user as IUser,
      );
    });
  }, []);

  return (
    <div
      className={clsx(
        'overflow-y-auto overflow-x-hidden',
        ' position-absolute top-0 bottom-0 start-0 end-0',
        'd-flex flex-column-reverse',
      )}
    >
      {messages.map((m) => (
        <Message
          key={m._id}
          message={m}
          currentUser={user}
          author={memberMap.current.get(m.user as string) as IUser}
        />
      ))}
    </div>
  );
}
