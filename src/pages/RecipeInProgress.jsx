import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function MealsInProgress({ match: { params: { id } } }) {
  // recupa o id da receita que esta salvo nas props quando faz o link de direcionamento
  const [recipe, setRecipe] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getRecipe() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();
      setRecipe(meals[0]);// faz o fetch da receita com o id das props
    }
    getRecipe();
    // recupera favoritos do localstorage:
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    // recupera oq esta no localstorage ou o arraay vazio se nao da erro
    setFavorites(localFavorites);// salva o resultado no estado
    setIsfavorite(localFavorites.some((item) => item.id === id));
    // verifica se dentro do que foi recuperado do local tem a chave com o id se sim retorna true se nao retorna false
    // recupera inProgress do localstorage:
    const localInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
      // recupera o inprogress se nao tiver naada faz um objeto com drinks e meals vazio
    if (Object.keys(localInProgress.meals).includes(id)) {
      setInProgressList(localInProgress.meals[id]);
      // se a chave meals do obj recuperado tiver o id que veio por props,
      // ele salva o valor que tem dentro do is que sao os ingredientes ja checkados
    }
  }, [id]);

  const handleShareBtn = () => {
    copy(`http://localhost:3000/meals/${id}`);// funcao do botao de compartilhar  que copia a recita
    setIsCopied(true);//
  };

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);
    // faz o mesures com o entries que retorna um array de arrays com a chave e o valor do obj anterior
    const measureList = recipeEntries
      .filter((pair) => pair[0].includes('Measure') && pair[1] !== ' ');
    setMeasures(measureList);// e salva no estado
  }

  function getIngredients(item) {
    const recipeEntries = Object.entries(item);
    // faz o ingredients com o entries que retorna um array de arrays com a chave e o valor do obj anterior
    const ingredientList = recipeEntries
      .filter((pair) => pair[0].includes('Ingredient') && pair[1] !== '')
      .filter((entry) => entry[1] !== null);
    setIngredients(ingredientList);// e salva no estado
  }

  useEffect(() => {
    getIngredients(recipe);
    // chama o ingredients e o mesures toda vez que a receita aalterar
    // pois ele é chamado para renderizar o correto
    getMeasures(recipe);
  }, [recipe]);// toda vez que o recipe alterar ele chama esses dois

  const handleFavoriteBtn = () => {
    if (isFavorite) { // se for verdade
      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(false);
    } else { // se for falso
      const newFavorites = [...favorites, {
        // faz um array com o estado anterior mais o novo com
        // o que veio da recipe de acordo com o modelo pedido
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '', // como se trata de comida coloca um espaco vazio
        name: recipe.strMeal,
        image: recipe.strMealThumb }];
      setFavorites(newFavorites);// salva no estado
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));// salva no local store
      setIsfavorite(true);// altera para true para o coracao ficar preto
    }
  };

  useEffect(() => {
    const { drinks, meals } = JSON
    // recupera as chaves drinks e meals de dentro do local sstorage na chave inprogressrecipe
      .parse(localStorage
        .getItem('inProgressRecipe')) || { drinks: {}, meals: {} };
    // se nao ele faz esse objeto com as chaves vazias
    meals[id] = inProgressList;// toda vez que o inprogress list mudar ele refaz esse meals[id]
    // colocando o inprogresslist atualizado pq ele é um shouldupdata

    const attLocalStorage = { drinks, meals };
    localStorage.setItem('inProgressRecipes', JSON.stringify(attLocalStorage));
  }, [inProgressList, id]);// e salva novamente no localstorage alterado o meals

  const handleCheckbox = ({ target }) => {
    target.parentElement.className = 'ingredientList';// quando cheka ele coloca essa classe que risca
    setInProgressList([...inProgressList, target.value]);
    // coloca os ingredientes que acabaram de ser checkados juntos com os outros
  };

  const isChecked = (ingredient) => inProgressList.some((item) => item === ingredient);
  // se cada item do inprogresslist for igual a ingrediente uqe foi enviado como parametro  ele fica check

  const finishRecipe = () => {
    const localDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    // recupera a chave done recipes ou array vazio se nao da erro
    const doneRecipe = {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: new Date(), // coloca a data em que foi apertado o botao definish
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      // usa o split pq vem 2 strings ou + e tem que ser em array e o split trasforma em array
      // faz um obj de acordo com oq foi pedido com os criterios da recipe

    };
    console.log(doneRecipe);
    const attLocalDoneRecipe = JSON.stringify([...localDoneRecipe, doneRecipe]);
    // salva no localstorage oq foi recuperado e o obj novo
    localStorage.setItem('doneRecipes', attLocalDoneRecipe);
    history.push('/done-recipes');// e muda para a pagina de done recipes
  };

  return (
    <section>
      {/* //dados da recipe */}
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        width="200px"
      />
      <h2 data-testid="recipe-title">{ recipe.strMeal }</h2>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <div>
        {isCopied && <p>Link copied!</p>}
        {/* se copiar o link depois que apertar o botao compartilhar aparece esse mensagem */}
        <input
          type="image"
          src={ ShareIcon }
          alt="share button"
          onClick={ handleShareBtn }
          className="btns"
          data-testid="share-btn"
        />
        {isFavorite // se favorite for true aparece coração preto se nao aparece coracao branco
          ? (
            <input
              type="image"
              className="btns"
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              onClick={ handleFavoriteBtn }
              alt="blackHeartIcon"
            />
          )
          : (
            <input
              type="image"
              className="btns"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              onClick={ handleFavoriteBtn }
              alt="whiteHeartIcon"
            />
          ) }
        <ul>
          {ingredients.map((ingredient, index) => (// para cada ingrediente faz um checkbox
            <li key={ ingredient[0] }>
              <label
                htmlFor={ `ingredient-${ingredient[1]}-${measures[index][1]}` }
                data-testid={ `${index}-ingredient-step` }
                className={ isChecked(`${ingredient[1]}`) ? 'ingredientList' : null }
                // chama a função is checked que recbe como parametro o
                // ingredient e se for verdade coloca a classe ingredientlis se nao fica null
                // faz isso para ja começar riscado(caso tenha no localstorage) assim que voltar a pagina sem precisar apertar no botao
              >
                <input
                  type="checkbox"
                  id={ `ingredient-${ingredient[1]}-${measures[index][1]}` }
                  checked={ isChecked(`${ingredient[1]} - ${measures[index][1]}`) }
                  // no value coloca o mesure e o ingrediente para ele  coloca o mesmo no
                  // checked para ele checar o correto pq se tiver 2 oil ele checa os dois se
                  // nao tiver o mesure para diferenciar
                  onChange={ handleCheckbox }
                  // função que coloca o class paara riscar e salva os
                  // ingredientes no estado ingredientlist para por no localstorage
                  value={ `${ingredient[1]} - ${measures[index][1]}` }// no value coloca o mesure e o ingrediente para ele
                />
                {`${ingredient[1]} - ${measures[index][1] || ''}`}
              </label>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={ inProgressList.length < ingredients.length }
          // se os valores de inprogresslist for os mesmo de ingredients da recita ele libera o botao
          data-testid="finish-recipe-btn"
          onClick={ finishRecipe }// botao que termina a receita
        >
          Finish Recipe

        </button>
      </div>
    </section>
  );
}

MealsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsInProgress;
