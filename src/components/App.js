import React from 'react';
import { Route } from 'react-router-dom'
import Index from './Index';
import Show from './Show';
import Signup from './Signup';
import { BrowserRouter, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/polls/:pollId" component={Show} />
    </Switch>
  </BrowserRouter>
);

export default App;
