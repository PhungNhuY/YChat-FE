import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useEventListener, useSetup } from '../../hooks';
import { Layout, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { IUser } from '../../types';
import styles from './authenticated-layout.module.css';
import clsx from 'clsx';
import { LocalStorageService } from '../../services';
import { SocketContext } from '../../services/socket.service';
import { Menu2 } from './menu2';
import { Menu1 } from './menu1';

const { Content, Sider } = Layout;

export function AuthenticatedLayout() {
  const { user }: { user: IUser } = useAuth();
  if (!user._id) {
    return <Navigate to="/login" />;
  }

  const [collapsed, setCollapsed] = useState(
    LocalStorageService.get('siderState') === 'false' ? false : true,
  );
  const [contextHolder] = useSetup();
  const { token } = theme.useToken();

  // connect to socket
  const socket = useContext(SocketContext);
  useEffect(() => {
    // connect to socket
    socket.connect();

    return () => {
      // disconnect when component unmount, it means user logged out
      socket.disconnect();
    };
  }, []);
  // listen events
  useEventListener();

  return (
    <>
      {contextHolder}
      <Layout className="vh-100">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
            LocalStorageService.set('siderState', value ? 'true' : 'false');
          }}
          style={{
            background: token.colorBgContainer,
          }}
          theme="light"
          id="authenticated-layout-sider"
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <div>
              <div
                className={clsx(
                  styles.logo,
                  'd-flex justify-content-center align-items-center',
                )}
              >
                YChat
              </div>
              <Menu1 />
            </div>
            <Menu2 user={user} />
          </div>
        </Sider>
        <Layout className="vh-100">
          <Content id="authenticated-layout-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
