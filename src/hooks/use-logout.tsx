import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import { AuthStorageService } from '../services';

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const logout = () => {
    AuthStorageService.resetAll();
    setUser({});
    navigate('/login');
  };

  return logout;
}
