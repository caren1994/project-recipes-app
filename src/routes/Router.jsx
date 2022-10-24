import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Meals from '../pages/Meals';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/meals" component={ Meals } />
    </Switch>
  );
}

export default Router;
