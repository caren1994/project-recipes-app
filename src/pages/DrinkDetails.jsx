import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';

function DrinksDetails({ match: { params: { id } } }) {
  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { drinks } = await response.json();
      console.log(drinks);
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

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
