import React, { useState, useMemo, useEffect } from 'react';
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

  const getMealAPIResult = async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { meals } = await response.json();
      setData(meals);
    }
    if (searchOption === 'Name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const { meals } = await response.json();
      setData(meals);
    }
    if (searchOption === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const { meals } = await response.json();
        setData(meals);
      }
    }
  };

  const getDrinkAPIResult = async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { drinks } = await response.json();
      setData(drinks);
    }
    if (searchOption === 'Name') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const { drinks } = await response.json();
      setData(drinks);
    }
    if (searchOption === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const { drinks } = await response.json();
        setData(drinks);
      }
    }
  };

  useEffect(() => {
    if (searchSetup.pathname === '/meals') {
      getMealAPIResult(searchSetup);
    }
    if (searchSetup.pathname === '/drinks') {
      getDrinkAPIResult(searchSetup);
    }
  }, [searchSetup]);

  const context = useMemo(() => ({
    data,
    getSearchSetup,

  }), [data]);

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
