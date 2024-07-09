import { Button, Form, FormProps, Input } from 'antd';
import { useCallback } from 'react';

type LoginFormFieldsType = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const onFinish: FormProps<LoginFormFieldsType>['onFinish'] = useCallback(
    (values: LoginFormFieldsType) => {
      console.log('Success', values);
    },
    [],
  );

  return (
    <Form name="Login" onFinish={onFinish} autoComplete="off" layout="vertical">
      <Form.Item<LoginFormFieldsType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginFormFieldsType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-100">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
