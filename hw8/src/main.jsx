import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { Provider } from "react-redux";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') 
      .then((registration) => {
        console.log('Service Worker was registered successfully:', registration);
      })
      .catch((error) => {
        console.log('An error during Service Worker registration:', error);
      });
  });
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
