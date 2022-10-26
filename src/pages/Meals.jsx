import React, { useContext, useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/Recipes';
import AppContext from '../context/AppContext';

const CATEGORY_QTD = 5;

function Meals() {
  const { data, getData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);

  const getInitialData = useCallback(async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await response.json();
    getData(meals);
  }, [getData]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const { meals } = await response.json();
      setCategories(meals.slice(0, CATEGORY_QTD));
    }
    getCategories();
  }, [filter, data]);

  const MAX_SIZE = 12;
  const renderData = data.length > MAX_SIZE ? data.slice(0, MAX_SIZE) : data;

  const handleClickFilter = async (category) => {
    if (filter.length > 0 && filter[0] === category) {
      setFilter([]);
      getInitialData();
    } else {
      setFilter([category]);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const { meals } = await response.json();
      getData(meals);
    }
  };

  const handleClickAll = () => {
    setFilter([]);
    getInitialData();
  };

  return (
    <div>
      <Header title="Meals" />
      {categories
        .map((category) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ category.strCategory }
            onClick={ () => handleClickFilter(category.strCategory) }
          >
            {category.strCategory}
          </button>))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
      {/* data.length > 1 && */ renderData
        .map((meal, index) => (<RecipeCard
          index={ index }
          key={ meal.idMeal }
          id={ meal.idMeal }
          name={ meal.strMeal }
          src={ meal.strMealThumb }
        />))}
      <Footer />
    </div>
  );
}

export default Meals;
