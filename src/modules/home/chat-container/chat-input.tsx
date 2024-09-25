import { MdEmojiEmotions } from 'react-icons/md';
import styles from './chat-input.module.css';
import clsx from 'clsx';
import { THEME } from '../../../constants';

export function ChatInput() {
  return (
    <div className={styles.wrapper}>
      <input type="text" className={styles.input} placeholder="Aa" />
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
