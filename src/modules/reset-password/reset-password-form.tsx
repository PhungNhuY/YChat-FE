import { Button, Form, FormProps, Input, Modal, Spin } from 'antd';
import { IResetPassword } from '../../types';
import { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { globalValues } from '../../utils';
import { validateToken } from '../../services';

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('uid');
  const tokenId = searchParams.get('tid');
  const tokenValue = searchParams.get('tv');

  const [email, setEmail] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (userId && tokenId && tokenValue) {
        // validate token
        setIsValidating(true);
        const resEmail = await validateToken(
          userId,
          tokenId,
          tokenValue,
          onValidateFailure,
        );
        setEmail(resEmail);
        setIsValidating(false);
      }
    })();
  }, []);

  const onValidateFailure = () => {
    globalValues.navigate?.('/login');
  };

  const showSuccessNotification = () => {
    Modal.success({
      title: 'We found your account',
      afterClose: () => globalValues.navigate?.('/login'),
      centered: true,
      content:
        'We are going to send you an email. Follow the instructions to reset your password',
    });
  };

  const onFinish: FormProps<IResetPassword>['onFinish'] = async (
    values: IResetPassword,
  ) => {
    setIsLoading(true);
    // await forgotPassword(values.email, showSuccessNotification);
    setIsLoading(false);
  };

  return (
    <>
      {isValidating ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <Form
          name="ResetPassword"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{ remember: false }}
        >
          <div className="w-100">
            <h4 className="text-center fw-bold mb-4">Reset your password</h4>
          </div>
          <Form.Item<IResetPassword> label="Email">
            <Input disabled value={email} />
          </Form.Item>

          <Form.Item<IResetPassword>
            label="New password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<IResetPassword>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                'Reset'
              )}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
