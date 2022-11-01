import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState([]);

  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(localDoneRecipes);
    setDoneRecipesFiltered(localDoneRecipes);
  }, []);

  const handleShareBtn = (recipe) => {
    if (recipe.type === 'meal') {
      copy(`http://localhost:3000/meals/${recipe.id}`);
      console.log(`http://localhost:3000/meals/${recipe.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
      console.log(`http://localhost:3000/drinks/${recipe.id}`);
    }
    setIsCopied(true);
  };

  const isMealOrDrink = (recipe) => {
    if (recipe.type === 'meal') {
      return `/meals/${recipe.id}`;
    }
    return `/drinks/${recipe.id}`;
  };

  const handleFilter = ({ target }) => {
    switch (target.innerText) {
    case 'Drinks':
      setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'Meals':
      setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    default:
      setDoneRecipesFiltered(doneRecipes);
      break;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipesFiltered.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ isMealOrDrink(recipe) }>
              <img
                alt="imagem"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
            </Link>
            <Link to={ isMealOrDrink(recipe) }>
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <div>
              {
                recipe.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={ `${tag}-${i}` }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
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
              onClick={ () => handleShareBtn(recipe) }
              type="image"
              className="btns"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
              alt="share button"
            />
            {isCopied && <p>Link copied!</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
