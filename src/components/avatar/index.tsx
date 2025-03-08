import { Avatar as AntdAvatar } from 'antd';
import { DefaultAvatar } from './default-avatar';
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
    return <AntdAvatar src={avatar} size={80} className={className} />;
  } else {
    return (
      <DefaultAvatar username={username} size={size} className={className} />
    );
  }
}
