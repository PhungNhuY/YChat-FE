import clsx from 'clsx';
import { useAuth } from '../../../hooks';
import { AppDispatch, useAppSelector } from '../../../store';
import { Message } from './message';
import { useCallback, useEffect, useRef } from 'react';
import { IMember, IUser } from '../../../types';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { loadMoreMessagesThunk } from '../../../store/current-conversation.slice';
import { Spin } from 'antd';

const scrollThreshold = 300;
const debounceTime = 200;

export function Messages() {
  const { user }: { user: IUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation!,
  );
  const messages = useAppSelector(
    (state) => state.currentConversation.messages,
  );
  const loadingMessages = useAppSelector(
    (state) => state.currentConversation.loadingMessages,
  );
  const allMessagesLoaded = useAppSelector(
    (state) => state.currentConversation.allMessagesLoaded,
  );
  const firstLoadExecuted = useAppSelector(
    (state) => state.currentConversation.firstLoadExecuted,
  );
  const memberMap = useRef<Map<string, IUser>>(new Map<string, IUser>());

  useEffect(() => {
    // clear map
    memberMap.current.clear();

    // add memebers to map
    currentConversation.members.forEach((m) => {
      memberMap.current.set(
        ((m as IMember).user as IUser)._id,
        (m as IMember).user as IUser,
      );
    });
  }, []);

  // infinite scroll
  const wrapperRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const onScrollToTop = useCallback(
    debounce(() => {
      // console.log('top');
      if (!allMessagesLoaded) {
        dispatch(loadMoreMessagesThunk());
      }
    }, debounceTime),
    [allMessagesLoaded],
  );
  useEffect(() => {
    // define onScroll function
    const onScrollFunction = () => {
      if (
        messagesRef.current!.clientHeight +
          wrapperRef.current!.scrollTop -
          wrapperRef.current!.clientHeight <
        scrollThreshold
      ) {
        onScrollToTop();
      }
    };

    // add event listener
    if (wrapperRef.current && messagesRef.current) {
      wrapperRef.current.addEventListener('scroll', onScrollFunction);
    }

    // remove event listener when component unmounts
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('scroll', onScrollFunction);
      }
    };
  }, [allMessagesLoaded]);
  useEffect(() => {
    if (
      firstLoadExecuted &&
      messages &&
      !allMessagesLoaded &&
      messagesRef.current &&
      wrapperRef.current &&
      messagesRef.current.clientHeight <= wrapperRef.current.clientHeight
    ) {
      dispatch(loadMoreMessagesThunk());
    }
  }, [messages, firstLoadExecuted, allMessagesLoaded]);

  return (
    <div
      className={clsx(
        'overflow-y-auto overflow-x-hidden',
        ' position-absolute top-0 bottom-0 start-0 end-0',
        'd-flex flex-column-reverse',
      )}
      id="messages-wrapper-element"
      ref={wrapperRef}
    >
      <div
        className="d-flex flex-column-reverse"
        id="messages-element"
        ref={messagesRef}
      >
        {messages &&
          messages.map((m) => (
            <Message
              key={m._id}
              message={m}
              currentUser={user}
              author={memberMap.current.get(m.user as string) as IUser}
            />
          ))}
      </div>
      {loadingMessages && <Spin className="py-2" />}
    </div>
  );
}
