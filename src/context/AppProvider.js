import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [radios, setRadios] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState();

  const handleClick = useCallback(async () => {
    if (radios.includes('Ingredient')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i={search}');
      const { meals } = await response.json();
      setData(meals);
    }
    if (radios.includes('Name')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s={nome}');
      const { meals } = await response.json();
      setData(meals);
    }
    if (radios.includes('First letter')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}');
      const { meals } = await response.json();
      setData(meals);
    }
  }, [radios]);
  const context = useMemo(() => ({
    radios,
    setRadios,
    search,
    setSearch,
    handleClick,

  }), [radios, setRadios, search, setSearch, handleClick]);

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
