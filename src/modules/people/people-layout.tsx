import clsx from 'clsx';
import styles from './people-layout.module.css';
import { PeopleMenu } from '../../modules/people/menu/people-menu';
import { Outlet } from 'react-router-dom';

export function PeoplePageLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <div
          className={clsx(styles.block, styles.block1)}
          id="people-left-sidebar"
        >
          <PeopleMenu />
        </div>
        <div className={clsx(styles.block, styles.block2)} id="people-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
