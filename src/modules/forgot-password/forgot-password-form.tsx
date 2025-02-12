import { Button, Form, FormProps, Input, Modal, Spin } from 'antd';
import { IForgotPassword } from '../../types';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../services';
import { globalValues } from '../../utils';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const showSuccessNotification = () => {
    Modal.success({
      title: 'We found your account',
      afterClose: () => globalValues.navigate?.('/login'),
      centered: true,
      content:
        'We are going to send you an email. Follow the instructions to reset your password',
    });
  };

  const onFinish: FormProps<IForgotPassword>['onFinish'] = async (
    values: IForgotPassword,
  ) => {
    setIsLoading(true);
    await forgotPassword(values.email, showSuccessNotification);
    setIsLoading(false);
  };

  return (
    <Form
      name="ForgotPassword"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: false }}
    >
      <div className="w-100">
        <h4 className="text-center fw-bold mb-4">Forgot password ?</h4>
        <p className="text-center" style={{ fontSize: 12 }}>
          Don&apos;t worry, we will send you reset instructions
        </p>
      </div>
      <Form.Item<IForgotPassword>
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Invalid email address',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
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
            'Find'
          )}
        </Button>
      </Form.Item>

      <div
        className="d-flex justify-content-center w-100"
        style={{ fontSize: 14 }}
      >
        <span>{'Remember your password?'}</span>
        <Link className="ms-1" to={'/login'}>
          Login
        </Link>
      </div>
    </Form>
  );
}
