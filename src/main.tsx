import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import { GoogleAuthProvider } from './features/auth/GoogleAuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleAuthProvider>
        <App />
      </GoogleAuthProvider>
    </Provider>
  </React.StrictMode>,
);
