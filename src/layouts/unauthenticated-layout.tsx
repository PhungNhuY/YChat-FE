import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useSetup } from '../hooks';

export function UnauthenticatedLayout() {
  const [contextHolder] = useSetup();
  const { user } = useAuth();

  if (user._id) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {contextHolder}
      <Outlet />;
    </>
  );
}
