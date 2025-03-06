import { Button, Divider, Modal, Image, Avatar } from 'antd';
import { LuPencilLine } from 'react-icons/lu';

export function ProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      title="Profile"
      open={isOpen}
      onCancel={onClose}
      footer={
        <>
          <Divider className="my-2" />
          <Button
            className="w-100"
            type="text"
            icon={<LuPencilLine size={18} />}
            iconPosition="end"
            style={{ fontSize: 16 }}
          >
            Update info
          </Button>
        </>
      }
      width={400}
    >
      <Image
        src="https://cover-talk.zadn.vn/7/4/5/a/2/38e9246c9465e3133b298451582c45b8.jpg"
        style={{
          width: 'calc(100% + 48px)',
          marginLeft: '-24px',
          aspectRatio: '400/170',
          objectFit: 'cover',
        }}
        preview={{ mask: null }}
      />
      <div className="position-relative" style={{ height: 60 }}>
        <div className="position-absolute d-flex" style={{ top: '-25px' }}>
          <div className="flex-fixed-size">
            <Avatar
              src="https://cover-talk.zadn.vn/7/4/5/a/2/38e9246c9465e3133b298451582c45b8.jpg"
              size={80}
              style={{ border: '3px solid #fff' }}
            />
          </div>
          <div className="flex-expanding-size px-3" style={{ paddingTop: 30 }}>
            <span style={{ fontSize: 18 }}>Username</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
