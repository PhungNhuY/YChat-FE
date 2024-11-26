import clsx from 'clsx';
import styles from './people-page.module.css';

export function PeoplePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div
          className={clsx(styles.block, styles.block1)}
          id="people-left-sidebar"
        ></div>
        <div
          className={clsx(styles.block, styles.block2)}
          id="people-content"
        ></div>
      </div>
    </div>
  );
}
