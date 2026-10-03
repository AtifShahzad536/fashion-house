import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import store from './redux/store.js';
import SmoothScroll from './components/common/SmoothScroll.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <SmoothScroll>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1C1917',
                  color: '#FDFBF7',
                  borderRadius: '6px',
                  border: '1px solid #991B1B',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  padding: '12px 16px',
                },
                success: {
                  iconTheme: {
                    primary: '#991B1B',
                    secondary: '#1C1917',
                  },
                },
              }}
            />
          </SmoothScroll>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
