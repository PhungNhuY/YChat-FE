import { Button, Checkbox, Form, FormProps, Input, Spin } from 'antd';
import { Ilogin } from '../../types';
import { useLogin } from '../../hooks';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

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
      <Form.Item<Ilogin> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
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
    </Form>
  );
}
