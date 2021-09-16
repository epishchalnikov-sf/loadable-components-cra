import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { loadableReady } from '@loadable/component';

const renderMethod = window.serverData?.isSsrMode ? ReactDOM.hydrate : ReactDOM.render;

loadableReady(() => {
  renderMethod(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
