import clsx from 'clsx';
import styles from './chat-container.module.css';
import { FaRegImage } from 'react-icons/fa6';
import { THEME } from '../../../constants';
import { ChatInput } from './chat-input';
import { BiSolidLike } from 'react-icons/bi';

export function InputContainer() {
  return (
    <div className={clsx('flex-fixed-size', styles.inputContainer, 'd-flex')}>
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
        <ChatInput />
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
