import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/App.css';

function DrinksInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getRecipe() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await response.json();
      setRecipe(drinks[0]);
    }
    getRecipe();
    // recupera favoritos do localstorage:
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(localFavorites);
    setIsfavorite(localFavorites.some((item) => item.id === id));
    // recupera inProgress do localstorage:
    const localInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
    if (Object.keys(localInProgress.drinks).includes(id)) {
      setInProgressList(localInProgress.drinks[id]);
    }
  }, [id]);

  const handleShareBtn = () => {
    copy(`http://localhost:3000/drinks/${id}`);
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
        id: recipe.idDrink,
        type: 'drink',
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb }];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(true);
    }
  };

  useEffect(() => {
    const { drinks, meals } = JSON
      .parse(localStorage
        .getItem('inProgressRecipe')) || { drinks: {}, meals: {} };
    drinks[id] = inProgressList;
    const attLocalStorage = { drinks, meals };
    localStorage.setItem('inProgressRecipes', JSON.stringify(attLocalStorage));
  }, [inProgressList, id]);

  const handleCheckbox = ({ target }) => {
    target.parentElement.className = 'ingredientList';
    setInProgressList([...inProgressList, target.value]);
  };

  const isChecked = (ingredient) => inProgressList.some((item) => item === ingredient);

  const finishRecipe = () => {
    const localDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const doneRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],

    };
    const attLocalDoneRecipe = JSON.stringify([...localDoneRecipe, doneRecipe]);
    localStorage.setItem('doneRecipes', attLocalDoneRecipe);
    history.push('/done-recipes');
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        width="200px"
      />
      <h2 data-testid="recipe-title">{ recipe.strDrink }</h2>
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
                htmlFor={ `ingredient-${ingredient[1]}-${measures[index][1]}` }
                data-testid={ `${index}-ingredient-step` }
                className={ isChecked(`${ingredient[1]}`) ? 'ingredientList' : null }
              >
                <input
                  type="checkbox"
                  id={ `ingredient-${ingredient[1]}-${measures[index][1]}` }
                  checked={ isChecked(`${ingredient[1]} - ${measures[index][1]}`) }
                  onChange={ handleCheckbox }
                  value={ `${ingredient[1]} - ${measures[index][1]}` }
                />
                {`${ingredient[1]} - ${measures[index][1] || ''}`}
              </label>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={ inProgressList.length < ingredients.length }
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }
        >
          Finish Recipe

        </button>
      </div>
    </section>
  );
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksInProgress;
