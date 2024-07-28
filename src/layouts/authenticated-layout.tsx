import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useSetup } from '../hooks';
import { Avatar, Layout, Menu, MenuProps, theme } from 'antd';
import { useState } from 'react';
import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { IUser } from '../types';
import styles from './authenticated-layout.module.css';
import clsx from 'clsx';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
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

export function AuthenticatedLayout() {
  const { user }: { user: IUser } = useAuth();
  if (!user._id) {
    return <Navigate to="/login" />;
  }

  const [collapsed, setCollapsed] = useState(false);
  const [contextHolder] = useSetup();
  const { token } = theme.useToken();

  const onCLickMenu: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
      case 'conversation':
        break;

      case 'people':
        break;
    }
  };

  return (
    <>
      {contextHolder}
      <Layout className="vh-100">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: token.colorBgContainer,
          }}
          theme="light"
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="">
              <div
                className={clsx(
                  styles.logo,
                  'd-flex justify-content-center align-items-center',
                )}
              >
                YChat
              </div>
              <Menu
                theme="light"
                items={items}
                defaultSelectedKeys={['conversations']}
                onClick={onCLickMenu}
                style={{ border: 0 }}
              />
            </div>
            <div
              className={clsx(
                'd-flex justify-content-center align-items-center',
                styles.profile,
              )}
            >
              <Avatar className="me-1">{user.name[0]}</Avatar>
              <span
                className={clsx(
                  collapsed ? styles.name_hide : styles.name_show,
                )}
              >
                {user.name}
              </span>
            </div>
          </div>
        </Sider>
        <Layout className="vh-100">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
