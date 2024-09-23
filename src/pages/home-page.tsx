import clsx from 'clsx';
import styles from './home-page.module.css';
import { ConversationList } from '../modules/home/conversation-list/conversation-list';
import { ChatContainer } from '../modules/home/chat-container/chat-container';

export const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div
          className={clsx(styles.block, styles.block1)}
          id="home-conversation-list"
        >
          <ConversationList />
        </div>
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
      </div>
    </div>
  );
};
