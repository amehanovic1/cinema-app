import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DrawerProvider } from './context/DrawerContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </AuthProvider>
  </BrowserRouter>
);
