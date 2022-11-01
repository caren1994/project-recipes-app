import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchSetup, setSearchSetup] = useState({ pathname: '',
    searchOption: '',
    searchInput: '' });

  const getSearchSetup = (parameter) => {
    setSearchSetup(parameter);
  };

  const recipeNotFound = (item) => {
    if (item === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const getMealAPIResult = useCallback(async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { meals } = await response.json();
      recipeNotFound(meals);
      setData(meals || []);
    }
    if (searchOption === 'Name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const { meals } = await response.json();
      recipeNotFound(meals);
      setData(meals || []);
    }
    if (searchOption === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const { meals } = await response.json();
        recipeNotFound(meals);
        setData(meals || []);
      }
    }
  }, []);

  const getDrinkAPIResult = useCallback(async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { drinks } = await response.json();
      recipeNotFound(drinks);
      setData(drinks || []);
    }
    if (searchOption === 'Name') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const { drinks } = await response.json();
      recipeNotFound(drinks);
      setData(drinks || []);
    }
    if (searchOption === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const { drinks } = await response.json();
        recipeNotFound(drinks);
        setData(drinks || []);
      }
    }
  }, []);

  const getData = useCallback(async (initialData) => {
    setData(initialData);
  }, []);

  useEffect(() => {
    if (searchSetup.pathname === '/meals') {
      getMealAPIResult(searchSetup);
    }
    if (searchSetup.pathname === '/drinks') {
      getDrinkAPIResult(searchSetup);
    }
  }, [searchSetup, getDrinkAPIResult, getMealAPIResult]);

  const context = useMemo(() => ({
    data,
    getSearchSetup,
    getData,
  }), [data, getData]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
