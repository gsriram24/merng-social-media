import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
