import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import '../css/App.css';

const RECOMENDATION_NUMBER = 6;

function MealsDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendationDrink, setRecomendationDrink] = useState([]);

  function getIngredients(item) {
    const recipeEntries = Object.entries(item);
    const ingredientList = recipeEntries
      .filter((pair) => pair[0].includes('Ingredient') && pair[1] !== '');
    setIngredients(ingredientList);
  }

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);
    const measureList = recipeEntries
      .filter((pair) => pair[0].includes('Measure') && pair[1] !== ' ');
    setMeasures(measureList);
  }

  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      setRecipe(meals[0]);
    }
    getRecipeById();
  }, [id]);

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
              <img src={ e.strDrinkThumb } alt={ e.strDrink } />
            </div>))}
      </div>
      <button
        className="fixed"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>

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
