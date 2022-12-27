import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Meals from '../pages/Meals';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Drinks from '../pages/Drinks';
import MealsDetails from '../pages/MealDetails';
import DrinksDetails from '../pages/DrinkDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ MealsDetails } />
      {/* essa rota precisa do id da comida */}
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      {/* //teve que trocar o nome de meals para recipe para poder fazer os testes se nao fosse recipe nao rodava o teste */}
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
    // componente de rotas
  );
}

export default Router;
