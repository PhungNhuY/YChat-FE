import clsx from 'clsx';
import styles from './chat-container.module.css';
import { CgMoreAlt } from 'react-icons/cg';
import { Avatar } from 'antd';

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
            <CgMoreAlt size={20} className={clsx(styles.functionalButton)} />
          </button>
          {/* <CgMoreO size={20} /> */}
        </div>
      </div>
      <div className="flex-expanding-size">messages</div>
      <div className={clsx('flex-fixed-size', styles.inputContainer)}>
        input container
      </div>
    </div>
  );
}
