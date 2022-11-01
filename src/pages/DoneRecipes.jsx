import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(localDoneRecipes);
  }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            alt="imagem"
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            width="200px"
          />
          <h2 data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </h2>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <div>
            {
              recipe.tags.slice(0, 2).map((tag, i) => (
                <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))
            }
          </div>
          {recipe.type === 'meal'
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            )
            : (

              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>

            )}

          <input
            type="image"
            className="btns"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ ShareIcon }
            alt="share button"
          />
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
