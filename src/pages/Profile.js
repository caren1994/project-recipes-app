import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../components/Footer';
import Header from '../components/Header';
import doneRecipe from '../images/shareIcon.svg';
import favRecipes from '../images/whiteHeartIcon.svg';
import logoutIcon from '../images/blackHeartIcon.svg';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user')) || [];
  // recupera o email
  const history = useHistory();

  const handleFavRecipes = () => {
    history.push('/favorite-recipes');// muda para a tela de favorite receitas
  };

  const handleDoneRecipes = () => {
    history.push('/done-recipes');// muda para a tela de done recitas
  };

  const handleLogout = () => {
    localStorage.clear();// limpa o local storage e muda paara a tela de login
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email" className="text-orange-400 font-medium">
        { Object.values(email)}
        {/* // mostra o email */}
      </p>
      <button
        className="mt-8 ml-6 box-border border-b-2 border-orange-400 font-medium"
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleDoneRecipes }
      >
        <img src={ doneRecipe } alt="done recipes button" />
        Done Recipes
        {/* //muda para a tela de done recipes */}
      </button>
      <button
        className="mt-8 ml-6 box-border border-b-2 border-orange-400 font-medium"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavRecipes }
      >
        <img src={ favRecipes } alt="favorite recipes button" />
        Favorite Recipes
        {/* //muda para a tela de favorite recipes */}
      </button>
      <button
        className="mt-8 ml-6 box-border border-b-2 border-orange-400 font-medium"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        <img src={ logoutIcon } alt="logout button" />
        Logout
        {/* //muda para a tela de login */}
      </button>
      <Footer />
      {/* //renderiza o footer */}
    </div>
  );
}

export default Profile;
