import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { IUser } from '../types';

export function UnauthenticatedLayout() {
  const { user }: { user: IUser } = useAuth();

  if (user._id) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
