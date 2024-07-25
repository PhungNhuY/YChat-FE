import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useSetup } from '../hooks';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { useState } from 'react';
import { CommentOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { IUser } from '../types';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Conversations',
    key: 'Conversations',
    icon: <CommentOutlined />,
  },
  {
    label: 'People',
    key: 'People',
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

  return (
    <>
      {contextHolder}
      <Layout style={{ height: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ background: token.colorBgContainer }}
          theme="light"
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <Menu
              theme="light"
              items={items}
              defaultSelectedKeys={['Conversations']}
            />
            <Menu
              theme="light"
              items={[
                { label: user.name, key: user.name, icon: <UserOutlined /> },
              ]}
              defaultSelectedKeys={['Conversations']}
            />
          </div>
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
