// import React, { useEffect } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  // const [doneRecipes, setDoneRecipes] = useState([]);

  // useEffect(() => {
  //   const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   setDoneRecipes(localDoneRecipes);
  // }, []);

  return (
    <div>
      <Header title="Done Recipes" />
      {/* <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-meal-btn">Meals</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((e, index) => (
        <div key={ index }>
          <img alt="imagem" data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>texto </p>
          <h2 data-testid={ `${index}-horizontal-name` }> texto</h2>
          <p data-testid={ `${index}-horizontal-done-date` }> texto</p>
          {e.strTags}
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
          >
            Compartilhar Receita
          </button>
        </div>
      ))} */}
    </div>
  );
}

export default DoneRecipes;
