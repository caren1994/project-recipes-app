import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesFiltered, setFavoriteRecipesFiltered] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(localFavorites);
    setFavoriteRecipesFiltered(localFavorites);
  }, []);

  const handleFilter = ({ target }) => {
    switch (target.innerText) {
    case 'Drinks':
      setFavoriteRecipesFiltered(favoriteRecipes
        .filter((recipe) => recipe.type === 'drink'));
      break;
    case 'Meals':
      setFavoriteRecipesFiltered(favoriteRecipes
        .filter((recipe) => recipe.type === 'meal'));
      break;
    default:
      setFavoriteRecipesFiltered(favoriteRecipes);
      break;
    }
  };

  const handleShareBtn = (recipe) => {
    if (recipe.type === 'meal') {
      copy(`http://localhost:3000/meals/${recipe.id}`);
      console.log(`http://localhost:3000/meals/${recipe.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
      console.log(`http://localhost:3000/drinks/${recipe.id}`);
    }
    setIsCopied(true);
  };

  useEffect(() => {
    setFavoriteRecipesFiltered(favoriteRecipes);
  }, [favoriteRecipes]);

  const removeFavorite = (recipe) => {
    const attFavorites = favoriteRecipes.filter((item) => item.id !== recipe.id);
    setFavoriteRecipes(attFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(attFavorites));
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      {
        favoriteRecipesFiltered.map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              alt="imagem"
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              width="200px"
            />
            <h2 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h2>
            {recipe.type === 'meal'
              ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                </p>
              )}
            {isCopied && <p>Link copied!</p>}
            <input
              onClick={ () => handleShareBtn(recipe) }
              type="image"
              className="btns"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
              alt="share button"
            />
            <input
              type="image"
              className="btns"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ BlackHeartIcon }
              onClick={ () => removeFavorite(recipe) }
              alt="blackHeartIcon"
            />
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
