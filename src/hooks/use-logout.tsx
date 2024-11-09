import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { AuthStorageService } from '../services';
import { logout as logoutApi } from '../services';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const logout = () => {
    logoutApi();
    AuthStorageService.resetAll();
    setUser({});
    navigate('/login');
  };

  return logout;
}
