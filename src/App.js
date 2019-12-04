import React from 'react';
import logo from './logo.svg';
import './App.css';
import ModelViewer from './components/modelviewer'

function App() {
  const Viewer = ModelViewer();
  return (
    <div className="App">
      <header className="App-header">
        
        <a>
          React 3d model viewer for TelichCo
        </a>
        
      </header>
      <body>
        { Viewer }
        

      </body>  
    </div>
  );
}

export default App;
