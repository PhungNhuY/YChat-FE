import './App.css';
import { AuthProvider } from './providers';
import Routes from './router';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
