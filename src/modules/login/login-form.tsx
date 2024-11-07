import { Button, Form, FormProps, Input } from 'antd';
import { Ilogin } from '../../types';
import { useLogin } from '../../hooks';

export default function LoginForm() {
  const login = useLogin();

  const onFinish: FormProps<Ilogin>['onFinish'] = async (values: Ilogin) => {
    login(values);
  };

  return (
    <Form name="Login" onFinish={onFinish} autoComplete="off" layout="vertical">
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
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-100">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
