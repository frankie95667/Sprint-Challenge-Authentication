import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';

// pages
import Jokes from './pages/Jokes';
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';


function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Index />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/jokes">
        <Jokes />
      </Route>
    </div>
  );
}

export default App;
