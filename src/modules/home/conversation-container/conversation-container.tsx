import clsx from 'clsx';
import styles from './conversation-container.module.css';
import { IoCreateOutline } from 'react-icons/io5';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { AppDispatch, getConversationsThunk } from '../../../store';
import { useDispatch } from 'react-redux';
import { ConversationList } from './conversation-list';

export function ConversationContainer() {
  const dispatch = useDispatch<AppDispatch>();

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(
      getConversationsThunk({
        page: 1,
      }),
    );
  }, []);

  return (
    <div
      className={clsx(styles.conversationContainer, 'd-flex flex-column')}
      id="conversation-container"
    >
      {/* heading */}
      <div
        className={clsx(
          'd-flex justify-content-between align-items-center',
          'flex-fixed-size',
          styles.heading,
        )}
        id="conversation-container-heading"
      >
        <span className={clsx(styles.headingTitle)}>Conversations</span>
        <button className={clsx(styles.newConversationButton)}>
          <IoCreateOutline
            size={18}
            className={clsx(styles.newConversationButtonIcon)}
          />
        </button>
      </div>

      {/* search */}
      <div
        className={clsx(
          styles.search,
          'd-flex justify-content-between align-items-center gap-1',
          'flex-fixed-size',
        )}
        id="conversation-container-search"
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

      {/* list */}
      <ConversationList />
    </div>
  );
}
