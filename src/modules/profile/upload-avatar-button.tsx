import { Button, Spin, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { API_BASE_URL } from '../../constants';
import { CiCamera } from 'react-icons/ci';
import { useAuth } from '../../hooks';
import { useState } from 'react';
import { AuthStorageService } from '../../services';
import { globalValues } from '../../utils';

export function UploadAvatarButton() {
  const { user, setUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <ImgCrop zoomSlider cropShape="round">
      <Upload
        name="file"
        accept=".jpg,.jpeg,.png,.gif,.webp"
        action={`${API_BASE_URL}/users/me/avatar`}
        method="PUT"
        maxCount={1}
        withCredentials
        className="profile-upload-avatar"
        onChange={(info) => {
          if (info.file.status === 'uploading') {
            setIsUploading(true);
          }
          if (info.file.status === 'done') {
            // update user avatar in context
            setUser({ ...user, avatar: info.file.response?.data?._id });
            // update user avatar in local storage
            AuthStorageService.setLoginUser({
              ...AuthStorageService.getLoginUser(),
              avatar: info.file.response?.data?._id,
            });
            setIsUploading(false);
            globalValues.messageApi?.success('Avatar uploaded successfully');
          } else if (info.file.status === 'error') {
            setIsUploading(false);
            globalValues.messageApi?.error('Avatar upload failed');
          }
        }}
      >
        <Button
          className="position-absolute"
          style={{
            backgroundColor: '#C6CAD2',
            width: 26,
            height: 26,
            right: -4,
            bottom: 4,
            borderRadius: '50%',
            padding: 0,
          }}
          disabled={isUploading}
        >
          {isUploading ? <Spin size="small" /> : <CiCamera />}
        </Button>
      </Upload>
    </ImgCrop>
  );
}
