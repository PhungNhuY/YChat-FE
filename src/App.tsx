import './App.css';
import { AuthProvider } from './providers';
import Routes from './router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { SocketContext, socket } from './socket';

function App() {
  return (
    <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#f5f5f5',
          },
        }}
      >
        <AuthProvider>
          <SocketContext.Provider value={socket}>
            <Routes />
          </SocketContext.Provider>
        </AuthProvider>
      </ConfigProvider>
    </ReduxProvider>
  );
}

export default App;
