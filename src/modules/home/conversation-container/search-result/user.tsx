import clsx from 'clsx';
import {
  EFriendshipStatus,
  IUser,
  IUserWithFriendshipStatus,
} from '../../../../types';
import styles from './user.module.css';
import { Avatar } from '../../../../components';
import { Button, Spin, Tooltip } from 'antd';
import { LuMessageCircle } from 'react-icons/lu';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useAuth } from '../../../../hooks';
import { MdOutlineCancel } from 'react-icons/md';
import { CiCircleCheck } from 'react-icons/ci';
import { globalValues } from '../../../../utils';
import { sendRequest } from '../../../../services';
import { useState } from 'react';

export function User({ data }: { data: IUserWithFriendshipStatus }) {
  const { user }: { user: IUser } = useAuth();

  const onAcceptRequest = () => {
    globalValues.messageApi?.warning('Feature under development');
  };
  const onDeclineRequest = () => {
    globalValues.messageApi?.warning('Feature under development');
  };
  const onCancelRequest = () => {
    globalValues.messageApi?.warning('Feature under development');
  };
  const onSendMessage = () => {
    globalValues.messageApi?.warning('Feature under development');
  };
  const onSendRequest = async () => {
    setIsSendingRequest(true);
    sendRequest(data._id, () => {
      setIsSendingRequest(false);
      globalValues.messageApi?.success('Request sent successfully');
    });
  };
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  return (
    <div
      className={clsx(
        styles.wrapper,
        'd-flex justify-content-between align-items-center gap-2',
      )}
    >
      <Avatar
        size={32}
        className="flex-fixed-size"
        avatar={data.avatar}
        username={data.name}
      />
      <div className="flex-expanding-size">
        <span className={clsx(styles.name)}>{data.name}</span>
      </div>

      {!data.friendship ||
      data.friendship.status === EFriendshipStatus.DECLINED ? (
        <Tooltip title={'Add friend'}>
          <Button
            size="small"
            shape="circle"
            // icon={<IoPersonAddOutline />}
            icon={
              isSendingRequest ? <Spin size="small" /> : <IoPersonAddOutline />
            }
            onClick={onSendRequest}
          />
        </Tooltip>
      ) : (
        <>
          {data.friendship.status === EFriendshipStatus.ACCEPTED && (
            <Tooltip title="Send message">
              <Button
                size="small"
                shape="circle"
                icon={<LuMessageCircle />}
                onClick={onSendMessage}
              />
            </Tooltip>
          )}
          {data.friendship.status === EFriendshipStatus.REQUESTED &&
            data.friendship.sender === user._id && (
              <Tooltip title="Cancel request">
                <Button
                  size="small"
                  shape="circle"
                  icon={<MdOutlineCancel />}
                  onClick={onCancelRequest}
                />
              </Tooltip>
            )}

          {data.friendship.status === EFriendshipStatus.REQUESTED &&
            data.friendship.receiver === user._id && (
              <div>
                <Tooltip title="Accept request">
                  <Button
                    size="small"
                    shape="circle"
                    icon={<CiCircleCheck />}
                    className="me-1"
                    onClick={onAcceptRequest}
                  />
                </Tooltip>
                <Tooltip title="Decline request">
                  <Button
                    size="small"
                    shape="circle"
                    icon={<MdOutlineCancel />}
                    onClick={onDeclineRequest}
                  />
                </Tooltip>
              </div>
            )}
        </>
      )}
    </div>
  );
}
