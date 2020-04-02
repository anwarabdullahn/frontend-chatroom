import React from 'react';
import { Button } from 'antd';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      
    </Provider>
  );
}

export default App;
