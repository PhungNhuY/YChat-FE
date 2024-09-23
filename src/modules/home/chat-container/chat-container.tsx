import clsx from 'clsx';
import styles from './chat-container.module.css';

export function ChatContainer() {
  return (
    <div className={clsx('h-100 d-flex flex-column')}>
      <div className={clsx('flex-fixed-size', styles.heading)}>heading</div>
      <div className="flex-expanding-size">messages</div>
      <div className={clsx('flex-fixed-size', styles.inputContainer)}>
        input container
      </div>
    </div>
  );
}
