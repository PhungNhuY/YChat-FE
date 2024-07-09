import LoginForm from '../modules/login/login-form';

function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="" style={{ width: '100%', maxWidth: 300 }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
