import React from 'react';
import { Route } from 'react-router-dom'
import Index from './Index';
import Show from './Show';
import NotFound from './NotFound';
import { BrowserRouter, Switch } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/polls/:slug" component={Show} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
