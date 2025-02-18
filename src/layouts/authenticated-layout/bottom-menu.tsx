import { Avatar, Menu, MenuProps } from 'antd';
import { IUser } from '../../types';
import { MdOutlineHelp, MdSettings } from 'react-icons/md';
import { globalValues } from '../../utils';
import { PiWarningFill } from 'react-icons/pi';
import { GrTextAlignFull } from 'react-icons/gr';
import { TbLogout } from 'react-icons/tb';
import { useLogout } from '../../hooks';

type MenuItem = Required<MenuProps>['items'][number];

export function BottomMenu({ user }: { user: IUser }) {
  const logout = useLogout();

  const menu: MenuItem[] = [
    {
      label: user.name,
      key: 'user',
      icon: <Avatar size={32}>{user.name[0]}</Avatar>,
      className: 'profile-menu-item',
      children: [
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
    <Menu
      theme="light"
      items={menu}
      selectedKeys={[]}
      style={{ border: 0 }}
      expandIcon={null}
      className="profile-menu"
    />
  );
}
