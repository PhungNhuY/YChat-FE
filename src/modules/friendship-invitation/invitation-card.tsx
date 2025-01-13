import { Avatar, Card, Spin } from 'antd';
import { IFriendship, IUser } from '../../types';
import styles from './invitation-card.module.css';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  acceptRequestThunk,
  AppDispatch,
  declineRequestThunk,
} from '../../store';
dayjs.extend(relativeTime);

export function InvitationCard({
  invitation,
  accepting,
  declining,
}: {
  invitation: IFriendship;
  accepting: boolean;
  declining: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const acceptRequest = () => {
    if (!accepting && !declining) {
      dispatch(acceptRequestThunk(invitation._id));
    }
  };

  const declineRequest = () => {
    if (!accepting && !declining) {
      dispatch(declineRequestThunk(invitation._id));
    }
  };

  return (
    <Card
      style={{ width: '100%', height: '100%' }}
      actions={[
        accepting ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <p onClick={acceptRequest} className="m-0">
            Accept
          </p>
        ),
        declining ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <p onClick={declineRequest} className="m-0">
            Decline
          </p>
        ),
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
