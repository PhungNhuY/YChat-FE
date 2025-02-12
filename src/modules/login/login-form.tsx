import { Button, Checkbox, Form, FormProps, Input, Spin } from 'antd';
import { Ilogin } from '../../types';
import { useLogin } from '../../hooks';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const login = useLogin();

  const onFinish: FormProps<Ilogin>['onFinish'] = async (values: Ilogin) => {
    setIsLoading(true);
    await login(values);
    setIsLoading(false);
  };

  return (
    <Form
      name="Login"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: false }}
    >
      <div className="w-100">
        <h4 className="text-center fw-bold mb-4">Login to YChat</h4>
      </div>
      <Form.Item<Ilogin>
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
      <Form.Item<Ilogin>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Item<Ilogin>
          name="remember"
          valuePropName="checked"
          label={null}
          className="m-0"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link to={'/auth/forgot-password'}>Forgot password</Link>
      </div>
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
            'Log in'
          )}
        </Button>
      </Form.Item>

      <div
        className="d-flex justify-content-center w-100"
        style={{ fontSize: 14 }}
      >
        <span>{"Don't have an account yet?"}</span>
        <Link className="ms-1" to={'/register'}>
          Register
        </Link>
      </div>
    </Form>
  );
}
