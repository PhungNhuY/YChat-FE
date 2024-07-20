import { message } from 'antd';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { globalValues } from '../utils';

export const useSetup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [ran, setRan] = useState(false);

  // only run setup once
  if (!ran) {
    globalValues.messageApi = messageApi;
    globalValues.navigate = navigate;
    globalValues.setUser = setUser;
    setRan(true);
  }
  return [contextHolder];
};
