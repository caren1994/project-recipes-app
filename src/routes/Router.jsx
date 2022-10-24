import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/search" component={ SearchBar } />
    </Switch>
  );
}

export default Router;
