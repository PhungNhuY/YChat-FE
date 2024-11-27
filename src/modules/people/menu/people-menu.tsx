import clsx from 'clsx';
import styles from './people-menu.module.css';
import { PiUserList } from 'react-icons/pi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiUserShared2Line } from 'react-icons/ri';

export function PeopleMenu() {
  return (
    <div className={clsx('d-flex flex-column h-100')}>
      <div
        className={clsx(
          'd-flex justify-content-between align-items-center',
          'flex-fixed-size',
          styles.heading,
        )}
      >
        <span className={clsx(styles.headingTitle)}>People</span>
        {/* <button className={clsx(styles.newConversationButton)}>
          <IoCreateOutline
            size={18}
            className={clsx(styles.newConversationButtonIcon)}
          />
        </button> */}
      </div>
      <div className={clsx('flex-expanding-size overflow-y-auto')}>
        <button
          className={clsx(
            'empty-button d-flex justify-content-start align-items-center',
            styles.menuButton,
          )}
        >
          <PiUserList size={24} className="me-2" />
          Friends
        </button>
        <button
          className={clsx(
            'empty-button d-flex justify-content-start align-items-center',
            styles.menuButton,
          )}
        >
          <HiOutlineUserGroup size={24} className="me-2" />
          Groups
        </button>
        <button
          className={clsx(
            'empty-button d-flex justify-content-start align-items-center',
            styles.menuButton,
          )}
        >
          <RiUserShared2Line size={24} className="me-2" />
          Friend invitation
        </button>
      </div>
    </div>
  );
}
