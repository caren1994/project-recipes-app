import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function RecipeCard({ name, src, index, id }) {
  const history = useHistory();

  return (
    <Link to={ `${history.location.pathname}/${id}` }>
      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <img width="100px" data-testid={ `${index}-card-img` } src={ src } alt={ name } />
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  key: PropTypes.string,
}.isRequired;

export default RecipeCard;
