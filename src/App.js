import React from 'react';
import logo from './logo-blue.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Products from './containers/Products';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br></br>
        <Router>
        <div>
          <Route path="/" component={Products} />
        </div>
      </Router>
      </header>
    </div>
  );
}


export default App;
