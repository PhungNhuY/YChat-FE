import { TbLogout } from 'react-icons/tb';
import { PopoverButton } from '../../components';
import { useLogout } from '../../hooks';

export function LogoutButton() {
  const logout = useLogout();
  return (
    <PopoverButton
      text="Logout"
      onClick={logout}
      icon={<TbLogout size={20} />}
    />
  );
}
