import { Button, Divider, Modal, Image } from 'antd';
import { LuPencilLine } from 'react-icons/lu';
import styles from './profile-modal.module.css';
import clsx from 'clsx';
import { useAuth } from '../../hooks';
import { EUserGender, IUser } from '../../types';
import { Avatar } from '../../components';
import dayjs from 'dayjs';

export function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user }: { user: IUser } = useAuth();
  return (
    <Modal
      title="Profile"
      open={isOpen}
      onCancel={onClose}
      footer={
        <>
          <Divider className="my-2" />
          <Button
            className={clsx('w-100', styles.updateButton)}
            type="text"
            icon={<LuPencilLine size={18} />}
            iconPosition="end"
          >
            Update info
          </Button>
        </>
      }
      width={400}
    >
      <Image
        src="https://cover-talk.zadn.vn/7/4/5/a/2/38e9246c9465e3133b298451582c45b8.jpg"
        preview={{ mask: null }}
        className={styles.background}
      />
      <div className={clsx('position-relative', styles.nameAndAvatar)}>
        <div className="position-absolute d-flex">
          <div className="flex-fixed-size">
            <Avatar
              size={80}
              username={user.name}
              avatar={user.avatar}
              className={styles.avatar}
            />
          </div>
          <div className="flex-expanding-size px-3" style={{ paddingTop: 30 }}>
            <span style={{ fontSize: 18 }}>{user.name}</span>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className="">
        <span className={styles.infoTitle}>Personal information</span>
        <table>
          <tbody>
            <tr>
              <td className={styles.field}>Email:</td>
              <td className={styles.value}>{user.email ?? ''}</td>
            </tr>
            <tr>
              <td className={styles.field}>Gender:</td>
              <td className={styles.value}>
                {user.gender ? EUserGender[user.gender].toLowerCase() : ''}
              </td>
            </tr>
            <tr>
              <td className={styles.field}>DOB:</td>
              <td className={styles.value}>
                {user.DOB ? dayjs(user.DOB).format('DD/MM/YYYY') : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
