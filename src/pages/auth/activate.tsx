import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { activateAccount } from '../../services';
import { globalValues } from '../../utils';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function ActivatePage() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('uid');
  const tokenId = searchParams.get('tid');
  const tokenValue = searchParams.get('tv');

  useEffect(() => {
    (async () => {
      if (userId && tokenId && tokenValue) {
        // activate account
        await activateAccount(userId, tokenId, tokenValue, () => {
          // show success notification
          Modal.success({
            title: 'Account activation successful',
          });
        });

        // redirect to login
        globalValues.navigate?.('/login');
      }
    })();
  }, []);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
}
