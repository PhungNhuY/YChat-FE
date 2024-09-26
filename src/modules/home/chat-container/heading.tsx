import { Avatar } from 'antd';
import clsx from 'clsx';
import { CgMoreAlt } from 'react-icons/cg';
import styles from './chat-container.module.css';
import { useAppSelector, useAuth } from '../../../hooks';
import { IUser } from '../../../types';
import { genConversationName } from '../../../utils/conversation';

export function ChatContainerHeading() {
  const { user }: { user: IUser } = useAuth();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );

  return (
    <div
      className={clsx(
        'flex-fixed-size',
        styles.heading,
        'd-flex justify-content-between',
      )}
    >
      <div
        className={clsx('d-flex align-items-center px-2 py-1', styles.thread)}
      >
        <Avatar size={40} />
        <div className="ms-2 d-flex flex-column">
          <span className={clsx(styles.conversationName)}>
            {genConversationName(currentConversation, user)}
          </span>
          <span className={clsx(styles.conversationStatus)}>...</span>
        </div>
      </div>
      <div className="d-flex align-items-center px-2">
        <button className="empty-button rounded-circle">
          <CgMoreAlt
            size={20}
            className={clsx(styles.functionalButton)}
            color="#A100F2"
          />
        </button>
        {/* <CgMoreO size={20} /> */}
      </div>
    </div>
  );
}
