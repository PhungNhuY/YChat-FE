import { Avatar } from 'antd';
import { useAppSelector } from '../../../store';
import { genConversationName } from '../../../utils/conversation';
import { useAuth } from '../../../hooks';
import { EConversationType, IUser } from '../../../types';
import styles from './conversation-info-container.module.css';
import clsx from 'clsx';
import { GroupMembers } from './group-members';

export function ConversationInfoContainer() {
  const { user }: { user: IUser } = useAuth();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center h-100 pt-4 px-2"
      id="conversation-info-container"
    >
      <Avatar size={70} />
      <span className={clsx('mt-2', styles.conversationName)}>
        {genConversationName(currentConversation, user)}
      </span>

      {currentConversation.type === EConversationType.GROUP && <GroupMembers />}
    </div>
  );
}
