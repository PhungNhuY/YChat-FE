import { Menu, MenuProps } from 'antd';
import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const menu: MenuItem[] = [
  {
    label: 'Conversations',
    key: 'conversations',
    icon: <CommentOutlined />,
  },
  {
    label: 'People',
    key: 'people',
    icon: <TeamOutlined />,
  },
];

export function TopMenu() {
  // caculate selected tabs from current path
  const location = useLocation();
  const [selectedTabs, setSelectedTabs] = useState<string>('');
  useEffect(() => {
    setSelectedTabs(
      location.pathname === '/'
        ? 'conversations'
        : location.pathname.startsWith('/people')
          ? 'people'
          : '',
    );
  }, [location]);

  // hadle click menu
  const navigate = useNavigate();
  const onCLickMenu: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case 'conversations':
        navigate('/');
        break;

      case 'people':
        navigate('/people');
        break;
    }
  };

  return (
    <Menu
      theme="light"
      items={menu}
      selectedKeys={[selectedTabs]}
      onClick={onCLickMenu}
      style={{ border: 0 }}
    />
  );
}
