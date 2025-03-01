import { AuthenFormLayout } from '../layouts/authen-form-layout';
import RegisterForm from '../modules/register/register-form';

export function RegisterPage() {
  return (
    <AuthenFormLayout>
      <RegisterForm />
    </AuthenFormLayout>
  );
}
