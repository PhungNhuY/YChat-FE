import { Avatar } from 'antd';
import { nameToColor } from '../../utils';

export function DefaultAvatar({
  username,
  size,
  className,
}: {
  username: string;
  size: number;
  className?: string;
}) {
  return (
    <Avatar
      size={size}
      style={{
        backgroundColor: nameToColor(username),
        color: 'white',
        fontSize: size / 2,
      }}
      className={className}
    >
      {username[0].toUpperCase()}
    </Avatar>
  );
}
