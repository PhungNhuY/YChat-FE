import clsx from 'clsx';
import styles from './home-page.module.css';
import { ConversationContainer } from '../modules/home/conversation-container/conversation-container';
import { ChatContainer } from '../modules/home/chat-container/chat-container';
import { useAppSelector } from '../store';
import { ConversationInfoContainer } from '../modules/home/conversation-info-container/conversation-info-container';
import { useState } from 'react';

export const HomePage = () => {
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation,
  );
  const isOpenInfoContainerState = useState(false);
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
              <ChatContainer
                isOpenInfoContainerState={isOpenInfoContainerState}
              />
            </div>
            <div
              className={clsx(styles.block, styles.block3)}
              style={{
                display: isOpenInfoContainerState[0] ? 'block' : 'none',
              }}
              id="home-conversation-info"
            >
              <ConversationInfoContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
