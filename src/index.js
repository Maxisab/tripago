import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //COMMENT OUT STRICT MODE TO STOP DOUBLE POSTING OF CONSOLE
  
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);