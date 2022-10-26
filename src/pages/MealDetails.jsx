import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

function MealsDetails({ match: { params: { id } } }) {
  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      console.log(meals);
    }
    getRecipeById();
  }, [id]);

  return (
    <div>
      <h1>{id}</h1>
      <RecipeDetails />
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
