import clsx from 'clsx';
import styles from './chat-container.module.css';
import { FaRegImage } from 'react-icons/fa6';
import { THEME } from '../../../constants';
import { ChatInput } from './chat-input';
import { BiSolidLike } from 'react-icons/bi';
import { useState } from 'react';
import { sendMessage } from '../../../services';
import { useAppSelector } from '../../../store';

export function InputContainer() {
  const textState = useState<string>('');
  const [text, setText] = textState;
  const currentConversationId = useAppSelector(
    (state) => state.currentConversation.conversation!._id,
  );
  const onSubmit = () => {
    if (textState[0] === '') return;
    sendMessage(currentConversationId, text);
    setText('');
  };
  return (
    <div
      className={clsx(styles.inputContainer, 'd-flex')}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSubmit();
        }
      }}
    >
      <div className="flex-fixed-size d-flex align-items-center">
        <button
          className={clsx(
            'empty-button rounded-circle',
            'd-flex justify-content-center align-items-center',
            styles.functionalButton,
            styles.inputButton,
          )}
        >
          <FaRegImage size={18} color={THEME.primary} />
        </button>
      </div>
      <div className="flex-expanding-size mx-2">
        <ChatInput textState={textState} />
      </div>
      <div className="flex-fixed-size">
        <button
          className={clsx(
            'empty-button rounded-circle',
            'd-flex justify-content-center align-items-center',
            styles.functionalButton,
            styles.inputButton,
          )}
        >
          <BiSolidLike size={18} color={THEME.primary} />
        </button>
      </div>
    </div>
  );
}
