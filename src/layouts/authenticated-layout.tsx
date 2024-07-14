import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { globalValues } from '../utils';
import { useState } from 'react';
import { message } from 'antd';

export function AuthenticatedLayout() {
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

  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {contextHolder}
      <Outlet />;
    </>
  );
}
