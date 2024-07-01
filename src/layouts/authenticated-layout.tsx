import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { IUser } from '../types';

export function AuthenticatedLayout() {
  const { user }: { user: IUser } = useAuth();

  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
