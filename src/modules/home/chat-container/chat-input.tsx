import { MdEmojiEmotions } from 'react-icons/md';
import styles from './chat-input.module.css';
import clsx from 'clsx';
import { THEME } from '../../../constants';
import { Dispatch, SetStateAction } from 'react';

export function ChatInput({
  textState,
}: {
  textState: [string, Dispatch<SetStateAction<string>>];
}) {
  const [text, setText] = textState;
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Aa"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className={clsx(
          'empty-button',
          styles.emojiButton,
          'd-flex justify-content-center align-items-center',
        )}
      >
        <MdEmojiEmotions size={20} color={THEME.primary} />
      </button>
    </div>
  );
}
