import clsx from 'clsx';
import styles from './chat-container.module.css';
import { CgMoreAlt } from 'react-icons/cg';
import { Avatar } from 'antd';
import { ChatInput } from './chat-input';
import { THEME } from '../../../constants';
import { FaRegImage } from 'react-icons/fa6';
import { BiSolidLike } from 'react-icons/bi';

export function ChatContainer() {
  return (
    <div className={clsx('h-100 d-flex flex-column')}>
      <div
        className={clsx(
          'flex-fixed-size',
          styles.heading,
          'd-flex justify-content-between',
        )}
      >
        <div
          className={clsx('d-flex align-items-center px-2 py-1', styles.thread)}
        >
          <Avatar size={40} />
          <div className="ms-2 d-flex flex-column">
            <span className={clsx(styles.conversationName)}>Nhom Hoc Tap</span>
            <span className={clsx(styles.conversationStatus)}>status</span>
          </div>
        </div>
        <div className="d-flex align-items-center px-2">
          <button className="empty-button rounded-circle">
            <CgMoreAlt
              size={20}
              className={clsx(styles.functionalButton)}
              color="#A100F2"
            />
          </button>
          {/* <CgMoreO size={20} /> */}
        </div>
      </div>

      <div className="flex-expanding-size">messages</div>

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
    </div>
  );
}
