import { Link } from 'react-router-dom';
import LoginForm from '../modules/login/login-form';

export function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="" style={{ width: '100%', maxWidth: 300 }}>
        <LoginForm />
        <div
          className="d-flex justify-content-center w-100"
          style={{ fontSize: 14 }}
        >
          <span>{"Don't have an account yet?"}</span>
          <Link className="ms-1" to={'/register'}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
