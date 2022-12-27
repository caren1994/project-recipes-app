import PropTypes from 'prop-types';
import React from 'react';
import '../css/App.css';

function RecipeDetails({
  src, name, category, ingredients,
  measures, instructions, video }) { // recebe do meals e drinks as props
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        data-testid="recipe-photo"
        src={ src }
        alt={ name }
        width="250px"
        className="
        recipe rounded-md  mt-10 mb-8 box-border  border-2 border-gray-600 "
      />
      <div className="flex ">
        <h1
          data-testid="recipe-title"
          className="font-medium
       text-2xl mb-10 text-orange-400 mr-4"
        >
          {name}

        </h1>
        <h3
          data-testid="recipe-category"
          className="font-medium
       text-2xl mb-10"
        >

          {' '}
          {category}

        </h3>

      </div>
      <h2
        className="font-medium
       text-2xl mb-8"
      >
        Ingredients:

      </h2>
      {ingredients.map((ingredient, index) => ( // a chave ingredinte é um array e faz um map
        <p
          className="font-medium
        text-lg "
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient[0] }
        >
          {`${ingredient[1]} - ${measures[index][1] || ''}`}
          {/* // ele aproveitou o map do ingredient e colocou o mesures do lado e ele tbm percorreu o mesures */}
          {/* ele vai de index em index na posição um do entries se nao tiver mesures coloca vazio */}
        </p>
      ))}
      <h2
        className="font-medium
       text-2xl mt-8 mb-8 box-border border-b-2 border-orange-400"
      >
        Instructions:

      </h2>
      <p
        className="font-medium w-60
       mt-8 mb-8 box-border border-b-2 border-orange-400"
        data-testid="instructions"
      >
        {instructions}

      </p>
      {/* //renderiza as intruções */}
      {video && (// se tiver o video ele coloca o iframe
        <iframe
          width="300"
          height="280"
          src={ video.replace('watch?v=', 'embed/') }// renderiza o video usa o replace para tirar o watch e colocar o embed
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
