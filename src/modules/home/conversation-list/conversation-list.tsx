import clsx from 'clsx';
import styles from './conversation-list.module.css';
import { IoCreateOutline } from 'react-icons/io5';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Conversation } from './conversation';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { getConversationsThunk } from '../../../store/conversation.slice';
import { useDispatch } from 'react-redux';
import { ConversationSkeleton } from './conversation-skeleton';

export function ConversationList() {
  const conversations = useAppSelector(
    (state) => state.conversation.conversations,
  );
  const loading = useAppSelector((state) => state.conversation.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(getConversationsThunk());
  }, []);

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
        {loading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <ConversationSkeleton key={i} />
            ))}
          </>
        ) : (
          conversations.map((data, i) => <Conversation key={i} data={data} />)
        )}
      </div>
    </div>
  );
}
