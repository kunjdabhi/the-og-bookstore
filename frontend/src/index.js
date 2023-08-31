import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import { WishListContextProvider } from './Context/WishlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WishListContextProvider>
        <App />
      </WishListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
