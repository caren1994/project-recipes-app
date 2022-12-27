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
    }// funcao que manda um alert caso nao ache nenhum recipe (null)
  };

  const getMealAPIResult = useCallback(async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { meals } = await response.json();
      recipeNotFound(meals);
      setData(meals || []);
    }// desconstroi o searchOption, searchInput de dentro do serchsetupque foi enviado como parametro  e faz os filtros de condição para a api
    if (searchOption === 'Name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      const { meals } = await response.json();
      recipeNotFound(meals);
      setData(meals || []); // retorna o resultado da api ou um array vazio para nao quebrar a  pagina
    }
    if (searchOption === 'First letter') {
      if (searchInput.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        // alerta pq é só uma letra para digitar caso digite mais que uma
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
        const { meals } = await response.json();
        recipeNotFound(meals);// chama a função caso retorne null
        setData(meals || []);
      }
    }
  }, []);

  const getDrinkAPIResult = useCallback(async ({ searchOption, searchInput }) => {
    if (searchOption === 'Ingredient') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      const { drinks } = await response.json();
      recipeNotFound(drinks);
      setData(drinks || []); // mesma coisa da função de cima só que com drink
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
    setData(initialData);// recebe do meals o retorno da aapi e salva no estado
  }, []);

  useEffect(() => {
    if (searchSetup.pathname === '/meals') {
      getMealAPIResult(searchSetup);
    }// assim que monta a tela e quando houver alteração em seachsetup ele ve se o pthname é meals e chama
    // a função com seachsetupe que recebeu pela função do click do botao do sechbar
    // os valores dos inputs
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
