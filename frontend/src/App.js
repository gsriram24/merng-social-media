import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
const App = () => {
  return (
    <Router>
      <Router exact path='/' component={Home} />
      <Router exact path='/login' component={Login} />
      <Router exact path='/register' component={Register} />
    </Router>
  );
};

export default App;
