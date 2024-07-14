import { MessageInstance } from 'antd/es/message/interface';
import { NavigateFunction } from 'react-router-dom';

export const globalValues: {
  navigate: null | NavigateFunction;
  messageApi: null | MessageInstance;
  setUser: null | ((user: any) => void);
} = {
  navigate: null,
  messageApi: null,
  setUser: null,
};
