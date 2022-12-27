import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';// importação paara o botao do compartilhar que copia a url
import RecipeDetails from '../components/RecipeDetails';
import '../css/App.css';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RECOMENDATION_NUMBER = 6;

function MealsDetails({ match: { params: { id } } }) { // pega das props que vem do app o id
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendationDrink, setRecomendationDrink] = useState([]);
  const [renderBtn, setRenderBtn] = useState(false);
  const [renderContinue, setRenderContinue] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function getRecipeById() {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();// faz um fetch da receita com o id selecionado
      setRecipe(meals[0]);// guarda no estado o retorno da 1 e unica receita
    }
    getRecipeById();
    // recupera favoritos do localstorage:
    const localFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(localFavorites);
    // console.log(localFavorites.some((item) => item.id === id));
    setIsfavorite(localFavorites.some((item) => item.id === id));
    // console.log(localFavorites);
  }, [id]);

  function getIngredients(item) { // recebe o recipe que é a unica receita do id
    const recipeEntries = Object.entries(item);// faz o obj entries que retorna um aray com aarrays  de  chave e valor
    const ingredientList = recipeEntries
      .filter((pair) => pair[0].includes('Ingredient') && pair[1] !== '')
      .filter((entry) => entry[1] !== null);
      // faz um filter que ve se o elemento na posicao 0 é a chave ingrediente
      // e na posicao 1 é o valor porem diferente de ""(vazio),
      // depois faz outro filtro retirando os valores null
    setIngredients(ingredientList);
    // e salva a resposta no estado ingredient
  }

  function getMeasures(item) {
    const recipeEntries = Object.entries(item);// faz o entries que retorna um array com arrays de chave e valor do antigo obj
    const measureList = recipeEntries
      .filter((pair) => pair[0].includes('Measure') && pair[1] !== ' ');// faz o filter e retira as que for espaco vazio
    setMeasures(measureList);// salva o resultado no estado mesures
  }

  useEffect(() => {
    getIngredients(recipe);// chama a função dos ingredientes no useffect
    getMeasures(recipe);// chama a função das medidas no useffect
  }, [recipe]);// toda vez que alterar a receita ele altera os dois que sao renderizados no card recipe detail e chama a função)

  useEffect(() => {
    async function getRecomendationDrink() { // faz o fetch da api dos drinks paara recomendação
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();

      setRecomendationDrink(drinks.slice(0, RECOMENDATION_NUMBER));// faz o fetch da api de drinks paraa fazer o carrousel de recomendações
    }
    // com no maximo 6 drinks
    getRecomendationDrink();
  }, []);

  useEffect(() => {
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    // recupera uma chave cm receitas feitas ou array vazio sempre para nao dar erro
    const result = !doneRecipe.some((item) => item.id === id);
    // se nessa chave recuperada tem o id igual ao id da receita renderizada retorna true
    setRenderBtn(result);// salva o resultado no estado
    const inProgressRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
      // recupera a chave inprogressrecipe  se nao existir ele retorna um objeto com as chaves meals e drinks vazios

    if (!Object.keys(inProgressRecipe).includes('meals')) {
      setRenderContinue(null);
      // se nao tiver ele retorna null para o estado quer dizer q nada esta em progresso nada deu start
    } else { // se tiver ele salva no estado o id da chave
      setRenderContinue(inProgressRecipe.meals[id]);
    }
  }, [id]);

  const handleClick = () => {
    if (!renderContinue) {
      // se rendercontinue for false ou null ele redireciona para tela de recitas em progresso
      history.push(`/meals/${id}/in-progress`);
    }
  };

  const handleShareBtn = () => {
    copy(`http://localhost:3000${history.location.pathname}`);// botao de compartilhar copia o cogigo
    setIsCopied(true);// e quando copiado muda o estado para true
  };

  const handleFavoriteBtn = () => { // quando clica no botao
    if (isFavorite) { // se for verdadeiro
      // se ja tiver favoritado ele retira do estado dos favoritos o item favoritado com aquele id
      // e salva no estado o array novo com o elemento excluido e atualiza com o array novo o
      // localstorage
      const newFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(newFavorites);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(false);// coloca para falso para o coração branco aparecer
    } else { // se for falso
      const newFavorites = [...favorites, {
        // ele faz um array com a receita novano formato desejado,junto com os estados anteriores
        // e salva no localstorage
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb }];
      setFavorites(newFavorites);// salva o array novo no estado
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsfavorite(true);// seta o isfavorite para true
    }
  };

  return (
    <div>
      <RecipeDetails // chama o componente dinamico que vaai renderizar os casrds
        src={ recipe.strMealThumb }// pega o objeto recipe e acessa pelas chaves selecionadas para formar os cards
        name={ recipe.strMeal }
        category={ recipe.strCategory }
        ingredients={ ingredients }
        measures={ measures }
        instructions={ recipe.strInstructions }
        video={ recipe.strYoutube }
      />
      <h2
        className="font-medium
        text-lg mt-8 mb-8"
      >
        Recomendation:

      </h2>
      {/* carrousel de recomendações de bebidas o css que faz o carrousel  */}
      <div className="carousel">
        {recomendationDrink // pega o estado  que ficou salva os drinks e faz um map
          .map((e, index) => (
            <div
              className="carouselItem "
              key={ e.idDrink }
              data-testid={ `${index}-recommendation-card` }
            >
              <h3 data-testid={ `${index}-recommendation-title` }>{e.strDrink}</h3>
              <img src={ e.strDrinkThumb } alt={ e.strDrink } width="250px" />
              {/* renderizando o nome e a imagem */}
            </div>))}
      </div>
      <div className="flex justify-center items-center">
        {renderBtn
      && (
        <button
          className="fixed"// tbm fica fixo por isso o css
          type="button"
          data-testid="start-recipe-btn"// botao de start recipe que pode mudar para continue recipe
          onClick={ handleClick }
        >
          {renderContinue ? 'Continue Recipe' : 'Start Recipe'}
          {/* // se o estado de rendercontinue é verdadeiro(se tiver algo)
          //aparece o botal continue se nao apaarece start */}
        </button>
      )}
        {isCopied && <p>Link copied!</p>}
        {/* //se for capiado o link do botao compartilhar aparece essa mensagem */}
        <button
          type="button"
          onClick={ handleShareBtn }// função que copia o link da url para compartilhar
          className="btns mr-4"
          data-testid="share-btn"
        >
          <img src={ ShareIcon } alt="share button" />
        </button>
        {/* //botao de favoritar a receita que depende do estado se
        for true mostra o coraçao preto se for false o coracao branco */}
        {isFavorite
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
      </div>
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
