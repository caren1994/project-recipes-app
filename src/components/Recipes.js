import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ name, src, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      <img width="100px" data-testid={ `${index}-card-img` } src={ src } alt={ name } />
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
}.isRequired;

export default RecipeCard;
