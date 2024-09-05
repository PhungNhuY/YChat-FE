import clsx from 'clsx';
import styles from './home.module.css';

export function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div
          className={clsx(styles.block, styles.block1)}
          id="home-conversations-list"
        >
          1
        </div>
        <div className={clsx(styles.block, styles.block2)} id="home-messages">
          2
        </div>
        <div
          className={clsx(styles.block, styles.block3)}
          id="home-conversation-info"
        >
          3
        </div>
      </div>
    </div>
  );
}
