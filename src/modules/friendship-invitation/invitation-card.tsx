import { Avatar, Card, Spin } from 'antd';
import { IFriendship, IUser } from '../../types';
import styles from './invitation-card.module.css';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LoadingOutlined } from '@ant-design/icons';
dayjs.extend(relativeTime);

export function InvitationCard({
  invitation,
  accepting,
}: {
  invitation: IFriendship;
  accepting: boolean;
}) {
  return (
    <Card
      style={{ width: '100%', height: '100%' }}
      actions={[
        accepting ? <Spin indicator={<LoadingOutlined spin />} /> : 'Accept',
        'Decline',
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar className="me-1">
            {(invitation.sender as IUser).name[0]}
          </Avatar>
        }
        title={(invitation.sender as IUser).name}
        description={dayjs(invitation.createdAt).fromNow()}
      />
      {invitation.message && (
        <div className={clsx('w-100 mt-2', styles.messageBox)}>
          {invitation.message}
        </div>
      )}
    </Card>
  );
}
