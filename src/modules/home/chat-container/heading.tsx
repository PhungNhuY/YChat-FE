import { Avatar } from 'antd';
import clsx from 'clsx';
import { CgMoreAlt, CgMoreO } from 'react-icons/cg';
import styles from './chat-container.module.css';
import { useAppSelector } from '../../../store';
import { IUser } from '../../../types';
import { genConversationName } from '../../../utils/conversation';
import { useAuth } from '../../../hooks';

export function ChatContainerHeading({
  isOpenInfoContainerState,
}: {
  isOpenInfoContainerState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
}) {
  const { user }: { user: IUser } = useAuth();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );

  return (
    <div className={clsx(styles.heading, 'd-flex justify-content-between')}>
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
        <button
          className="empty-button rounded-circle"
          onClick={() =>
            isOpenInfoContainerState[1](!isOpenInfoContainerState[0])
          }
        >
          {isOpenInfoContainerState[0] ? (
            <CgMoreO
              size={20}
              className={clsx(styles.functionalButton)}
              color="#A100F2"
            />
          ) : (
            <CgMoreAlt
              size={20}
              className={clsx(styles.functionalButton)}
              color="#A100F2"
            />
          )}
        </button>
      </div>
    </div>
  );
}
