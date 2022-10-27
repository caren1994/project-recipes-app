// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import '../css/App.css';

function RecipeDetails({
  src, name, category, ingredients,
  measures, instructions, video }) {
  return (
    <div>
      <img data-testid="recipe-photo" src={ src } alt={ name } width="350px" />
      <h1 data-testid="recipe-title">{name}</h1>
      <h3 data-testid="recipe-category">{category}</h3>
      <h2>Ingredients:</h2>
      {ingredients.map((ingredient, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient[0] }
        >
          {`${ingredient[1]} - ${measures[index][1] || ''}`}
          {/* ele vai de index em index na posição um do entries */}
        </p>
      ))}
      <h2>Instructions:</h2>
      <p data-testid="instructions">{instructions}</p>
      {video && (
        <iframe
          width="560"
          height="315"
          src={ video.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          data-testid="video"
          frameBorder="0"
          allow="
        accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />)}
    </div>
  );
}

RecipeDetails.defaultProps = {
  video: null,
};

RecipeDetails.propTypes = {
  category: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.array),
  instructions: PropTypes.string,
  measures: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
}.isRequired;

export default RecipeDetails;
