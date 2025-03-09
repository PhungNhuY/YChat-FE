import { Menu, MenuProps } from 'antd';
import { IUser } from '../../types';
import { MdOutlineHelp, MdSettings } from 'react-icons/md';
import { PiWarningFill } from 'react-icons/pi';
import { GrTextAlignFull } from 'react-icons/gr';
import { TbLogout } from 'react-icons/tb';
import { useLogout } from '../../hooks';
import { FaUser } from 'react-icons/fa';
import { ProfileModal } from '../../modules/profile/profile-modal';
import { useState } from 'react';
import { Avatar } from '../../components';
import { globalValues } from '../../utils';

type MenuItem = Required<MenuProps>['items'][number];

export function BottomMenu({ user }: { user: IUser }) {
  const logout = useLogout();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const menu: MenuItem[] = [
    {
      label: user.name,
      key: 'user',
      icon: (
        <Avatar
          username={user.name}
          size={34}
          avatar={user.avatar}
          className="flex-fixed-size"
        />
      ),
      className: 'profile-menu-item',
      children: [
        {
          label: 'Profile',
          key: 'profile',
          icon: <FaUser />,
          onClick: () => {
            setIsProfileModalOpen(true);
          },
        },
        {
          label: 'Option',
          key: 'option',
          icon: <MdSettings />,
          onClick: () => {},
        },
        {
          label: 'Help',
          key: 'help',
          icon: <MdOutlineHelp />,
          onClick: () =>
            globalValues.messageApi?.warning(
              'This feature is not available yet!',
            ),
        },
        {
          label: 'Crash report',
          key: 'crash-report',
          icon: <PiWarningFill />,
          onClick: () =>
            globalValues.messageApi?.warning(
              'This feature is not available yet!',
            ),
        },
        {
          label: 'Terms of use',
          key: 'terms-of-use',
          icon: <GrTextAlignFull />,
          onClick: () =>
            globalValues.messageApi?.warning(
              'This feature is not available yet!',
            ),
        },
        {
          label: 'Logout',
          key: 'logout',
          icon: <TbLogout />,
          onClick: logout,
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        theme="light"
        items={menu}
        selectedKeys={[]}
        style={{ border: 0 }}
        expandIcon={null}
        className="profile-menu"
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
