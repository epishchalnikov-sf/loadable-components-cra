import './App.css';
import loadable from '@loadable/component';
import React from 'react';

const LoadableComponent = loadable(() => import('./Component'));

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoadableComponent />
      </header>
    </div>
  );
}

export default App;
