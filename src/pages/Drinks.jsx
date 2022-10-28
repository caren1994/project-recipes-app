import React, { useContext, useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import RecipeCard from '../components/Recipes';

const CATEGORY_QTD = 5;

function Drinks() {
  const { data, getData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);

  const getInitialData = useCallback(async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await response.json();
    getData(drinks);
  }, [getData]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const { drinks } = await response.json();
      setCategories(drinks.slice(0, CATEGORY_QTD));
    }
    getCategories();
  }, []);

  const MAX_SIZE = 12;
  const renderData = data.length > MAX_SIZE ? data.slice(0, MAX_SIZE) : data;

  const handleClickFilter = async (category) => {
    if (filter.length > 0 && filter[0] === category) {
      setFilter([]);
      getInitialData();
    } else {
      setFilter([category]);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const { drinks } = await response.json();
      getData(drinks);
    }
  };

  const handleClickAll = () => {
    setFilter([]);
    getInitialData();
  };

  return (
    <div>
      <Header title="Drinks" />
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
      <div className="flexbox">
        {renderData
          .map((drink, index) => (
            <div key={ drink.idDrink }>
              <RecipeCard
                index={ index }
                id={ drink.idDrink }
                name={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />
            </div>))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
