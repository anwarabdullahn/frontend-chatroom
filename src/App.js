import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import LoginPages from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateComponent from './components/privateComponent';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" exact component={LoginPages} />
        <Route path="/register" exact component={RegisterPage} />
        <Switch>
          <PrivateComponent component={HomePage} path="/home" />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
