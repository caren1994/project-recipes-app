import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

function DrinksDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  function getIngredients(item) {
    const recipeEntries = Object.entries(item);
    const ingredientList = recipeEntries
      .filter((entry) => entry[0].includes('Ingredient'))
      .filter((entry) => entry[1] !== null);
    setIngredients(ingredientList);
    console.log(recipeEntries);
  }

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);
    const measureList = recipeEntries
      .filter((entry) => entry[0].includes('Measure'))
      .filter((entry) => entry[1] !== ' ');
    setMeasures(measureList);

    console.log(measureList);
  }

  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await response.json();
      setRecipe(drinks[0]);
    }
    getRecipeById();
  }, [id]);

  useEffect(() => {
    getIngredients(recipe);
    getMeasures(recipe);
  }, [recipe]);

  return (
    <div>
      <h1>{id}</h1>
      <RecipeDetails
        src={ recipe.strDrinkThumb }
        name={ recipe.strDrink }
        category={ recipe.strAlcoholic }
        ingredients={ ingredients }
        measures={ measures }
        instructions={ recipe.strInstructions }
      />
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
