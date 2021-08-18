import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const renderMethod = window.serverData?.isSsrMode ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
