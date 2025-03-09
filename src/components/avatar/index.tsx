import { Avatar as AntdAvatar } from 'antd';
import { DefaultAvatar } from './default-avatar';
import { ASSETS_API_BASE_URL } from '../../constants';
export function Avatar({
  username,
  avatar,
  size,
  className,
}: {
  username: string;
  avatar?: string;
  size: number;
  className?: string;
}) {
  if (avatar) {
    return (
      <AntdAvatar
        src={`${ASSETS_API_BASE_URL}/${avatar}`}
        size={size}
        className={className}
      />
    );
  } else {
    return (
      <DefaultAvatar username={username} size={size} className={className} />
    );
  }
}
