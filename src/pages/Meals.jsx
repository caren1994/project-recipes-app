import React, { useContext, useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/Recipes';
import AppContext from '../context/AppContext';

const CATEGORY_QTD = 5;

function Meals() {
  const { data, getData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);// recebe os filtros que forem adicionados

  const getInitialData = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    getData(meals);// envia para a função do provider oo getdataa o retorno da api q por sua vez salva no estado da data
  }, [getData]);

  useEffect(() => {
    getInitialData();// assim que renderiza a tela faz uma chamada para a api de comida
  }, [getInitialData]);

  useEffect(() => {
    async function getCategories() { // retorna as 5 primeiras caategorias que vao ser renderizada com o map
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();
      setCategories(meals.slice(0, CATEGORY_QTD));// ate 5 categorias e salva as categorias retornadas no estado
    }
    getCategories();// chama a função no useeffect
  }, []);

  const MAX_SIZE = 12;
  const renderData = data.length > MAX_SIZE ? data.slice(0, MAX_SIZE) : data;
  // caso o retorno da api ou dos filtros sejam maiores que 12 ele retorna apenas 12 receitas, se nao retorna data

  const handleClickFilter = async (category) => { // ele é um toggle que caso for clicado tras as categorias se clicar de novo tras as comidas e limpa os filtros
    if (filter.length > 0 && filter[0] === category) { // se filter for maior que zero e filter
      // na primeira posição for o valor enviado como parametro limpa o
      // filtro e faz a requição da api de comida
      setFilter([]);/// /limpa o filtro
      getInitialData();// faz a requisiçao das 12 comidas novamente
    } else {
      setFilter([category]);// filter recebe category enviado como parametro
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const { meals } = await response.json();
      getData(meals);// e faz o fecth com a categoria selecionada e salva no estado data que vai ser rendezidao na pagina
    }
  };

  const handleClickAll = () => {
    setFilter([]);// função que limpa os filtros e retorna as 12 primeiras comidas
    getInitialData();
  };

  return (
    <div>
      <Header title="Meals" />
      {categories// estado que esta salvo as categorias
        .map((category) => (
          <button
            className="box-border border-2 w-20 bg-orange-400 rounded-md mr-3 text-white"
            data-testid={ `${category.strCategory}-category-filter` }// o data test é cada catgoria com a chave do nome da categoria
            type="button"
            key={ category.strCategory }// é o nome da categoria
            onClick={ () => handleClickFilter(category.strCategory) }// manda para a função a categoria com o nome
          >
            {category.strCategory}
          </button>))}
      {/* acaba o map */}
      <button
        className="box-border border-2 w-20 bg-orange-400 rounded-md mr-3 mb-8 text-white"
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll } // função que limpa os filtros e retorna as 12 primeiras comidas
      >
        All
      </button>
      <div className="flexbox mb-14">
        {renderData // renderiza data no componente dinamico recipe card atravez do map
          .map((meal, index) => (
            <div key={ meal.idMeal }>
              <RecipeCard
                index={ index }
                id={ meal.idMeal }
                name={ meal.strMeal }
                src={ meal.strMealThumb }
              />
            </div>))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
