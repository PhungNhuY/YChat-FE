import clsx from 'clsx';
import styles from './conversation-list.module.css';
import {
  AppDispatch,
  loadMoreConversationsThunk,
  useAppSelector,
} from '../../../store';
import { ConversationSkeleton } from './conversation-skeleton';
import { Conversation } from './conversation';
import { useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

const scrollThreshold = 100;
const debounceTime = 500;

export function ConversationList() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useAppSelector(
    (state) => state.conversation.conversations,
  );
  const loading = useAppSelector((state) => state.conversation.loading);
  const total = useAppSelector((state) => state.conversation.total);

  // infinite scroll
  const wrapperRef = useRef<HTMLDivElement>(null);
  const conversationsRef = useRef<HTMLDivElement>(null);
  const onScrollToBottom = useCallback(
    debounce(() => {
      // console.log('bottom');
      if (conversations.length < total && !loading) {
        dispatch(loadMoreConversationsThunk());
      }
    }, debounceTime),
    [conversations, total, loading],
  );
  useEffect(() => {
    // define onScroll event
    const onScrollFunction = () => {
      if (
        conversationsRef.current!.clientHeight -
          (wrapperRef.current!.clientHeight + wrapperRef.current!.scrollTop) <
        scrollThreshold
      ) {
        onScrollToBottom();
      }
    }; // add event listener
    if (wrapperRef.current && conversationsRef.current) {
      wrapperRef.current.addEventListener('scroll', onScrollFunction);
    }

    // remove event listener when component unmounts
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', onScrollFunction);
      }
    };
  }, [conversations, total, loading]);

  return (
    <div
      className={clsx(
        styles.list,
        'flex-expanding-size overflow-y-auto overflow-x-hidden',
      )}
      id="conversation-container-list"
      ref={wrapperRef}
    >
      <div className="" ref={conversationsRef}>
        {conversations.map((data, i) => (
          <Conversation key={i} data={data} />
        ))}
        {loading && (
          <>
            {[...Array(5)].map((_, i) => (
              <ConversationSkeleton key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
