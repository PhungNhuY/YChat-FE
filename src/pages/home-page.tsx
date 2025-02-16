import clsx from 'clsx';
import styles from './home-page.module.css';
import { ConversationContainer } from '../modules/home/conversation-container/conversation-container';
import { ChatContainer } from '../modules/home/chat-container/chat-container';
import { useAppSelector } from '../store';

export const HomePage = () => {
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation,
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div
          className={clsx(styles.block, styles.block1)}
          id="home-conversation-list"
        >
          <ConversationContainer />
        </div>
        {currentConversation && (
          <>
            <div
              className={clsx(styles.block, styles.block2)}
              id="home-chat-container"
            >
              <ChatContainer />
            </div>
            <div
              className={clsx(styles.block, styles.block3)}
              id="home-conversation-info"
            >
              3
            </div>
          </>
        )}
      </div>
    </div>
  );
};
