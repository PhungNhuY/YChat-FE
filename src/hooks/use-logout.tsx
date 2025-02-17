import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { AuthStorageService } from '../services';
import { logout as logoutApi } from '../services';
import { useDispatch } from 'react-redux';
import { resetStore } from '../store';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const dispatch = useDispatch();
  const logout = () => {
    logoutApi();
    dispatch(resetStore());
    AuthStorageService.resetAll();
    setUser({});
    navigate('/login');
  };

  return logout;
}
