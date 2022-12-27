import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesFiltered, setFavoriteRecipesFiltered] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(localFavorites);// recupera oq vem do local e salva no estado
    setFavoriteRecipesFiltered(localFavorites);// salva uma copia para o filtro
  }, []);

  const handleFilter = ({ target }) => {
    switch (target.innerText) {
    case 'Drinks':// se for drink retorna todos com o type de drinks
      setFavoriteRecipesFiltered(favoriteRecipes
        .filter((recipe) => recipe.type === 'drink'));
      break; // altera o array de copia
    case 'Meals':// se for meals retorna todos com o type de meals
      setFavoriteRecipesFiltered(favoriteRecipes
        .filter((recipe) => recipe.type === 'meal'));
      break; // altera o array de copia
    default:// retorna o array original do retorno do fetch
      setFavoriteRecipesFiltered(favoriteRecipes);
      break;
      // altera o array de copia
    }
  };

  const handleShareBtn = (recipe) => { // funcao que copia o link da url se for meal ou drink
    if (recipe.type === 'meal') {
      copy(`http://localhost:3000/meals/${recipe.id}`);
      console.log(`http://localhost:3000/meals/${recipe.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
      console.log(`http://localhost:3000/drinks/${recipe.id}`);
    }
    setIsCopied(true);// muda para true para aprecer a mensagem
  };

  useEffect(() => {
    setFavoriteRecipesFiltered(favoriteRecipes);
  }, [favoriteRecipes]);
  // toda vez que o favoritesrecipes atualizar salva no estado que faz os filtros no futuro

  const removeFavorite = (recipe) => { // recebe recipe do map
    const attFavorites = favoriteRecipes.filter((item) => item.id !== recipe.id);
    // retorna um array novo com as recipes que forem diferentes da recipe do id enviado
    setFavoriteRecipes(attFavorites);// salva no estado o favoritos atualizado
    localStorage.setItem('favoriteRecipes', JSON.stringify(attFavorites));
    // e salva no localstorage os favoritos atualizados
  };

  const isMealOrDrink = (recipe) => {
    if (recipe.type === 'meal') { // funcao para redirecionar para a tela de detalhes de meals ou dinks
      return `/meals/${recipe.id}`;
    }
    return `/drinks/${recipe.id}`;
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
          {/* // botao de filtragem por todas as receitas  */}
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilter }
        >
          Meals
          {/* // botao de filtragem por  receitas  meals */}
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drinks
          {/* // botao de filtragem por  receitas drinks */}
        </button>
      </div>
      {
        favoriteRecipesFiltered.map((recipe, index) => (
          // renderiza as receitas favoritadas do array de copia com filtro ou sem
          <div key={ recipe.id }>
            <Link to={ isMealOrDrink(recipe) }>
              {/* //link no img e no name que muda para a pagina de detalhes da receita */}
              <img
                alt="imagem"
                src={ recipe.image }
                data-testid={ `${index}-horizontal-image` }
                width="200px"
              />
            </Link>
            <Link to={ isMealOrDrink(recipe) }>
              {/* //link no img e no name que muda para a pagina de detalhes da receita */}
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </Link>
            {recipe.type === 'meal'
              ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                  {/* a tag que falta se for meal aparece natinality e category */}
                </p>
              )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                  {/* a tag que falta se for drink aparece alcoholicornot e category */}
                </p>
              )}
            {isCopied && <p>Link copied!</p>}
            <input
              onClick={ () => handleShareBtn(recipe) } // funcao edo botao que compartilha
              type="image"
              className="btns"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ ShareIcon }
              alt="share button"
            />
            <input
              type="image"
              className="btns" // botao que  remove a recita dos favoritos
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ BlackHeartIcon }
              onClick={ () => removeFavorite(recipe) }
              alt="blackHeartIcon"
            />
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
