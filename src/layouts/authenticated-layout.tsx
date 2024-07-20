import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useSetup } from '../hooks';

export function AuthenticatedLayout() {
  const [contextHolder] = useSetup();
  const { user } = useAuth();

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
