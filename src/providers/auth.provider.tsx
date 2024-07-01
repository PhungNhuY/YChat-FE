import { createContext, useMemo, useState } from 'react';
import { AuthStorageService } from '../services/auth-storage.service';
import { IUser } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(AuthStorageService.getLoginUser());

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
