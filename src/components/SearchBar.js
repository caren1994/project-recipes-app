import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SearchBar({ pathname, history }) {
  const [radios, setRadios] = useState('Ingredient');
  const [search, setSearch] = useState('');
  const { getSearchSetup, data } = useContext(AppContext);
  const handleChangeRadio = ({ target }) => {
    setRadios(target.value);
  };

  useEffect(() => {
    if (data.length === 1) {
      if (pathname === '/meals') {
        history.push(`meals/${data[0].idMeal}`);
      }
      if (pathname === '/drinks') {
        history.push(`drinks/${data[0].idDrink}`);
      }
    }
  });

  const handleClick = () => {
    const searchParameter = {
      pathname,
      searchOption: radios,
      searchInput: search,
    };
    getSearchSetup(searchParameter);
  };

  return (
    <section>
      <label htmlFor="search-input">
        Procurar:
        <input
          type="text"
          id="search-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          data-testid="search-input"
        />
      </label>
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          type="radio"
          value="Ingredient"
          id="ingredient-search"
          name="radios"
          onChange={ handleChangeRadio }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          value="Name"
          id="name-search"
          name="radios"
          onChange={ handleChangeRadio }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search">
        First letter
        <input
          type="radio"
          value="First letter"
          id="first-letter-search"
          name="radios"
          onChange={ handleChangeRadio }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Search

      </button>

    </section>
  );
}

SearchBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SearchBar;
