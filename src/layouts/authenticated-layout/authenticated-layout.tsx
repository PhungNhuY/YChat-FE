import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useEventListener, useSetup } from '../../hooks';
import { Avatar, Layout, Menu, MenuProps, Popover, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { CommentOutlined, TeamOutlined } from '@ant-design/icons';
import { IUser } from '../../types';
import styles from './authenticated-layout.module.css';
import clsx from 'clsx';
import { LocalStorageService } from '../../services';
import { SocketContext } from '../../services/socket.service';
import { PopoverButton } from '../../components';
import { MdOutlineHelp, MdSettings } from 'react-icons/md';
import { PiWarningFill } from 'react-icons/pi';
import { GrTextAlignFull } from 'react-icons/gr';
import { LogoutButton } from './logout-button';
import { globalValues } from '../../utils';

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
                selectedKeys={[selectedTabs]}
                onClick={onCLickMenu}
                style={{ border: 0 }}
              />
            </div>
            <Popover
              className={clsx(
                'd-flex justify-content-center align-items-center',
                styles.profile,
              )}
              placement="topLeft"
              trigger={'click'}
              content={
                <div style={{ width: 250 }}>
                  <PopoverButton
                    text="Option"
                    onClick={() => {}}
                    icon={<MdSettings size={20} />}
                  />
                  <hr className="m-1" />
                  <PopoverButton
                    text="Help"
                    onClick={() =>
                      globalValues.messageApi?.warning(
                        'This feature is not available yet!',
                      )
                    }
                    icon={<MdOutlineHelp size={20} />}
                  />
                  <PopoverButton
                    text="Crash report"
                    onClick={() =>
                      globalValues.messageApi?.warning(
                        'This feature is not available yet!',
                      )
                    }
                    icon={<PiWarningFill size={20} />}
                  />
                  <PopoverButton
                    text="Terms of use"
                    onClick={() =>
                      globalValues.messageApi?.warning(
                        'This feature is not available yet!',
                      )
                    }
                    icon={<GrTextAlignFull size={20} />}
                  />
                  <hr className="m-1" />
                  <LogoutButton />
                </div>
              }
            >
              <Avatar className="me-1">{user.name[0]}</Avatar>
              <span
                className={clsx(
                  collapsed ? styles.name_hide : styles.name_show,
                )}
              >
                {user.name}
              </span>
            </Popover>
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
