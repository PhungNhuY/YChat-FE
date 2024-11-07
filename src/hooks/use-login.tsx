import { AuthStorageService, login as loginApi } from '../services';
import { Ilogin } from '../types';
import { useAuth } from './use-auth';
export function useLogin() {
  const { setUser } = useAuth();
  const login = async (value: Ilogin) => {
    const user = await loginApi(value);
    if (user) {
      AuthStorageService.setLoginUser(user);
      setUser({
        ...user,
        access_token: undefined,
        refresh_token: undefined,
      });
    }
  };
  return login;
}
