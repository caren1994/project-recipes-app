import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import doneRecipe from '../images/shareIcon.svg';
import favRecipes from '../images/whiteHeartIcon.svg';
import logoutIcon from '../images/blackHeartIcon.svg';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user')) || {};
  const history = useHistory();

  const handleFavRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">
        { Object.values(email)}
        {' '}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        <img src={ doneRecipe } alt="done recipes button" />
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavRecipes }
      >
        <img src={ favRecipes } alt="favorite recipes button" />
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        <img src={ logoutIcon } alt="logout button" />
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
