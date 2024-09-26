import clsx from 'clsx';
import { ChatContainerHeading } from './heading';
import { InputContainer } from './input-container';
import { useAppSelector } from '../../../hooks';

export function ChatContainer() {
  const currentConversation = useAppSelector(
    (state) => state.currentConversation.conversation,
  );
  return (
    currentConversation && (
      <div className={clsx('h-100 d-flex flex-column')}>
        <ChatContainerHeading />
        <div className="flex-expanding-size">messages</div>
        <InputContainer />
      </div>
    )
  );
}
