import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

setTimeout(() => {
  const loadingScreen = document.getElementById('loading');
  if (loadingScreen) {
    loadingScreen.classList.add('hide');
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }
}, 2000);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
