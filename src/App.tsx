import './App.css';
import { AuthProvider } from './providers';
import Routes from './router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
