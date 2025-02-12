import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  Spin,
} from 'antd';
import { EUserGender, IRegister } from '../../types';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { register } from '../../services';
import { globalValues } from '../../utils';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const showSuccessNotification = () => {
    Modal.success({
      title: 'Registration Successful',
      afterClose: () => globalValues.navigate?.('/login'),
      centered: true,
      content:
        'We are going to send you an email. Please check your email and follow the instructions to activate your account',
    });
  };

  const onFinish: FormProps<IRegister>['onFinish'] = async (
    values: IRegister,
  ) => {
    delete (values as any).confirmPassword;
    setIsLoading(true);
    await register(values);
    setIsLoading(false);
    showSuccessNotification();
  };

  return (
    <Form
      name="Register"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      initialValues={{ remember: false }}
    >
      <div className="w-100">
        <h4 className="text-center fw-bold mb-4">Register</h4>
      </div>
      <Form.Item<IRegister>
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

      <Form.Item<IRegister>
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IRegister & { confirmPassword: string }>
        label="Confirm Password"
        name={'confirmPassword'}
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              } else {
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              }
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<IRegister>
        label="Name"
        name={'name'}
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IRegister> label="Date of Birth" name={'DOB'}>
        <DatePicker className="w-100" maxDate={dayjs()} />
      </Form.Item>

      <Form.Item<IRegister> label="Gender" name={'gender'}>
        <Select>
          <Select.Option value={EUserGender.MALE}>Male</Select.Option>
          <Select.Option value={EUserGender.FEMALE}>Female</Select.Option>
          <Select.Option value={EUserGender.OTHER}>Other</Select.Option>
        </Select>
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
            'Register'
          )}
        </Button>
      </Form.Item>

      <div
        className="d-flex justify-content-center w-100"
        style={{ fontSize: 14 }}
      >
        <span>{'Already have an account?'}</span>
        <Link className="ms-1" to={'/login'}>
          Login
        </Link>
      </div>
    </Form>
  );
}
