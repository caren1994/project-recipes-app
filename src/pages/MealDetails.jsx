import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipeDetails from '../components/RecipeDetails';
import '../css/App.css';
import ShareIcon from '../images/shareIcon.svg';

const RECOMENDATION_NUMBER = 6;

function MealsDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendationDrink, setRecomendationDrink] = useState([]);
  const [renderBtn, setRenderBtn] = useState(false);
  const [renderContinue, setRenderContinue] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      console.log(meals);
      setRecipe(meals[0]);
    }
    getRecipeById();
  }, [id]);

  function getIngredients(item) {
    const recipeEntries = Object.entries(item);
    const ingredientList = recipeEntries
      .filter((pair) => pair[0].includes('Ingredient') && pair[1] !== '')
      .filter((entry) => entry[1] !== null);
    setIngredients(ingredientList);
    console.log(ingredientList);
  }

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);
    const measureList = recipeEntries
      .filter((pair) => pair[0].includes('Measure') && pair[1] !== ' ');
    setMeasures(measureList);
  }

  useEffect(() => {
    getIngredients(recipe);
    getMeasures(recipe);
  }, [recipe]);

  useEffect(() => {
    async function getRecomendationDrink() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();

      setRecomendationDrink(drinks.slice(0, RECOMENDATION_NUMBER));
    }
    getRecomendationDrink();
  }, []);

  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const result = !doneRecipe.some((item) => item.id === id);
    setRenderBtn(result);
    const inProgressRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes'));

    if (!Object.keys(inProgressRecipe).includes('meals')) {
      setRenderContinue(null);
    } else {
      setRenderContinue(inProgressRecipe.meals[id]);
    }
  }, [id]);

  const handleClick = () => {
    if (!renderContinue) {
      history.push(`/meals/${id}/in-progress`);
    }
  };

  const handleShareBtn = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
  };

  return (
    <div>
      <RecipeDetails
        src={ recipe.strMealThumb }
        name={ recipe.strMeal }
        category={ recipe.strCategory }
        ingredients={ ingredients }
        measures={ measures }
        instructions={ recipe.strInstructions }
        video={ recipe.strYoutube }
      />
      <h2>Recomendation:</h2>
      <div className="carousel">
        {recomendationDrink
          .map((e, index) => (
            <div
              className="carouselItem"
              key={ e.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <h3 data-testid={ `${index}-recommendation-title` }>{e.strDrink}</h3>
              <img src={ e.strDrinkThumb } alt={ e.strDrink } width="250px" />
            </div>))}
      </div>
      <div>
        {renderBtn
      && (
        <button
          className="fixed"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {renderContinue ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
        {isCopied && <p>Link copied!</p>}
        <button
          type="button"
          onClick={ handleShareBtn }
          className="btns"
          data-testid="share-btn"
        >
          <img src={ ShareIcon } alt="share button" />
        </button>
        <button
          type="button"
          className="btns"
          data-testid="favorite-btn"
        >
          Favorite

        </button>
      </div>
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
