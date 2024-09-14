import clsx from 'clsx';
import styles from './conversation-list.module.css';
import { IoCreateOutline } from 'react-icons/io5';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa6';
import { useState } from 'react';
import { Conversation } from './conversation';
import { RootState } from '../../../store';
import { useAppSelector } from '../../../hooks';

export function ConversationList() {
  const [isSearching, setIsSearching] = useState(false);
  const conversations = useAppSelector(
    (state: RootState) => state.conversation.conversations,
  );

  return (
    <div className={clsx(styles.conversationList, 'd-flex flex-column')}>
      <div
        className={clsx(
          'd-flex justify-content-between align-items-center',
          'flex-fixed-size',
          styles.heading,
        )}
      >
        <span className={clsx(styles.headingTitle)}>Conversations</span>
        <button className={clsx(styles.newConversationButton)}>
          <IoCreateOutline
            size={18}
            className={clsx(styles.newConversationButtonIcon)}
          />
        </button>
      </div>
      <div
        className={clsx(
          styles.search,
          'd-flex justify-content-between align-items-center gap-1',
          'flex-fixed-size',
        )}
      >
        {isSearching && (
          <button
            className={clsx(
              styles.search_backButton,
              'd-flex justify-content-center align-items-center',
              'flex-fixed-size',
            )}
            onClick={() => setIsSearching(false)}
          >
            <FaArrowLeft />
          </button>
        )}
        <Input
          type="text"
          className={clsx(styles.searchInput, 'flex-expanding-size')}
          placeholder="Find on YChat"
          prefix={<SearchOutlined />}
          onClick={() => setIsSearching(true)}
        />
      </div>
      <div className={clsx(styles.list, 'flex-expanding-size')}>
        {conversations.map((data, i) => (
          <Conversation key={i} data={data} />
        ))}
      </div>
    </div>
  );
}
