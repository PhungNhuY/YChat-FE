import './App.css';
import { AuthProvider } from './providers';
import Routes from './router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#f5f5f5',
        },
      }}
    >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
