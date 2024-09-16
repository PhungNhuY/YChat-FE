import clsx from 'clsx';
import styles from './conversation.module.css';
import { Skeleton } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function ConversationSkeleton() {
  return (
    <div
      className={clsx(
        styles.wrapper,
        'd-flex justify-content-between align-items-center gap-2',
      )}
    >
      <Skeleton.Avatar active size={46} className="flex-fixed-size" />
      <div className="flex-expanding-size d-flex flex-column">
        <Skeleton.Input
          active
          style={{ height: 18, width: '40%' }}
          className="mb-1"
        />
        <Skeleton.Input active style={{ height: 14, width: '90%' }} />
      </div>
    </div>
  );
}
