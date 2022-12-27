import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState([]);
  const [FilterCase, setFilterCase] = useState('All');

  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(localDoneRecipes);// recupera oq vem do local storage
    setDoneRecipesFiltered(localDoneRecipes);// salva uma cópia
  }, []);
  useEffect(() => {
    switch (FilterCase) { // pega o nome do botao clicado
    case 'Drinks':// se for drink faz o drink procurando todas que for do type drink
      setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      // altera o array de copia com o filter
      break;
    case 'Meals':// se for meals faz o drink procurando todas que for do type meals
      setDoneRecipesFiltered(doneRecipes.filter((recipe) => recipe.type === 'meal'));
      // altera o array de copia com o filter
      break;
    default:
      setDoneRecipesFiltered(doneRecipes);
      // se nao retorna todas,assim como vem recuperado do fecth.
      break;
         // altera o array de copia com o filter
    }
  }, [FilterCase, doneRecipes]);

  const handleShareBtn = (recipe) => { // botao de compartilhar a receita que ve se é drink ou meal
    if (recipe.type === 'meal') {
      copy(`http://localhost:3000/meals/${recipe.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
    }
    setIsCopied(true);// muda o estado para true para aparecer a mensagem
  };

  const isMealOrDrink = (recipe) => {
    if (recipe.type === 'meal') { // pega o type do recipe e se for meals redireciona para a recipe.id
      return `/meals/${recipe.id}`;
    }
    return `/drinks/${recipe.id}`;
    // pega o type do recipe e se for drinks redireciona para a recipe.id
  };

  const handleFilter = (type) => {
    setFilterCase(type);// guarda o nome do botao clicado
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('All') }// botao de filtrar
        >
          All
          {/* //renderiza os filtros para todas as receitas  */}
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('Meals') }
        >
          Meals
          {/* //renderiza os filtros para  as receitas de meals  */}
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('Drinks') }
        >
          Drinks
          {/* //renderiza os filtros para as receitas de drinks */}
        </button>
      </div>
      <div>
        {doneRecipesFiltered.map((recipe, index) => (
          // pega o array de copia com o filtro ou sem e retorna com o map
          // que pode ter dentro desse array meals e drinks
          <div key={ recipe.id }>
            <Link to={ isMealOrDrink(recipe) }>
              {/* //link para mudar para a pagina de detalhes */}
              <img
                alt="imagem"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
            </Link>
            <Link to={ isMealOrDrink(recipe) }>
              {/* link no name e na imagem */}
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {/* //data de quando foi finalizado */}
            <div>
              {
                recipe.tags.slice(0, 2).map((tag, i) => (// faz o slice para mostrar apenas 2 tags
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
                  {/* // a tag que falta nationality e category se for meal aparece elas */}
                </p>
              )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                  {/* // a tag que falta alcoholicornot e category se for drink aparece elas */}
                </p>
              )}
            <input
              onClick={ () => handleShareBtn(recipe) }// botao para compartilhar
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
