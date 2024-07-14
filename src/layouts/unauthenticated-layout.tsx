import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { globalValues } from '../utils';
import { message } from 'antd';

export function UnauthenticatedLayout() {
  const [messageApi, contextHolder] = message.useMessage();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [ran, setRan] = useState(false);

  // only run setup once
  if (!ran) {
    globalValues.messageApi = messageApi;
    globalValues.navigate = navigate;
    globalValues.setUser = setUser;
    setRan(true);
  }

  if (user._id) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {contextHolder}
      <Outlet />;
    </>
  );
}
