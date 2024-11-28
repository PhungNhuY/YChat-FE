import clsx from 'clsx';
import styles from './people-menu.module.css';
import { PiUserList } from 'react-icons/pi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiUserShared2Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PeopleMenu() {
  const navigate = useNavigate();
  // caculate selected tabs from current path
  const location = useLocation();
  const [selectedTabs, setSelectedTabs] = useState<string>('');
  useEffect(() => {
    const segments = location.pathname.split('/');
    if (segments.length >= 2 && segments[1] === 'people') {
      if (!segments[2]) setSelectedTabs('friends');
      else if (segments[2] === 'groups') setSelectedTabs('groups');
      else if (segments[2] === 'invitation') setSelectedTabs('invitation');
    }
  }, [location]);

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
            selectedTabs === 'friends' && styles.active,
          )}
          onClick={() => navigate('/people')}
        >
          <PiUserList size={20} className="me-2" />
          Friends
        </button>
        <button
          className={clsx(
            'empty-button d-flex justify-content-start align-items-center',
            styles.menuButton,
            selectedTabs === 'groups' && styles.active,
          )}
          onClick={() => navigate('/people/groups')}
        >
          <HiOutlineUserGroup size={20} className="me-2" />
          Groups
        </button>
        <button
          className={clsx(
            'empty-button d-flex justify-content-start align-items-center',
            styles.menuButton,
            selectedTabs === 'invitation' && styles.active,
          )}
          onClick={() => navigate('/people/invitation')}
        >
          <RiUserShared2Line size={20} className="me-2" />
          Friend invitation
        </button>
      </div>
    </div>
  );
}
