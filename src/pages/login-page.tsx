import { AuthenFormLayout } from '../layouts/authen-form-layout';
import LoginForm from '../modules/login/login-form';

export function LoginPage() {
  return (
    <AuthenFormLayout>
      <LoginForm />
    </AuthenFormLayout>
  );
}
