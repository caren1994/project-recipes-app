import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function MealsInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function getRecipe() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      setRecipe(meals[0]);
    }
    getRecipe();
    // recupera favoritos do localstorage:
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(localFavorites);
    setIsfavorite(localFavorites.some((item) => item.id === id));
  }, [id]);

  const handleShareBtn = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);
    const measureList = recipeEntries
      .filter((pair) => pair[0].includes('Measure') && pair[1] !== ' ');
    setMeasures(measureList);
  }

  function getIngredients(item) {
    const recipeEntries = Object.entries(item);
    const ingredientList = recipeEntries
      .filter((pair) => pair[0].includes('Ingredient') && pair[1] !== '')
      .filter((entry) => entry[1] !== null);
    setIngredients(ingredientList);
  }

  useEffect(() => {
    getIngredients(recipe);
    getMeasures(recipe);
  }, [recipe]);

  const handleFavoriteBtn = () => {
    if (isFavorite) {
      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(false);
    } else {
      const newFavorites = [...favorites, {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb }];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(true);
    }
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="200px"
      />
      <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <div>
        {isCopied && <p>Link copied!</p>}
        <input
          type="image"
          src={ ShareIcon }
          alt="share button"
          onClick={ handleShareBtn }
          className="btns"
          data-testid="share-btn"
        />
        {isFavorite
          ? (
            <input
              type="image"
              className="btns"
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              onClick={ handleFavoriteBtn }
              alt="blackHeartIcon"
            />
          )
          : (
            <input
              type="image"
              className="btns"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              onClick={ handleFavoriteBtn }
              alt="whiteHeartIcon"
            />
          ) }
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={ ingredient[0] }>
              <label
                htmlFor={ `ingredient-${ingredient[1]}` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ `ingredient-${ingredient[1]}` }
                  value={ `${ingredient[1]} - ${measures[index][1] || ''}` }
                />
                {`${ingredient[1]} - ${measures[index][1] || ''}`}
              </label>
            </li>
          ))}
        </ul>
        <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      </div>
    </section>
  );
}

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsInProgress;
