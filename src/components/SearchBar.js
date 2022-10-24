import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const { radios, setRadios, search, setSearch, handleClick,

  } = useContext(AppContext);

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
          value={ radios }
          name="radios"
          onChange={ ({ target }) => setRadios(target.value) }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          type="radio"
          value={ radios }
          name="radios"
          onChange={ ({ target }) => setRadios(target.value) }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search">
        First letter
        <input
          type="radio"
          value={ radios }
          name="radios"
          onChange={ ({ target }) => setRadios(target.value) }
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
      <p>{data}</p>
    </section>
  );
}

export default SearchBar;
