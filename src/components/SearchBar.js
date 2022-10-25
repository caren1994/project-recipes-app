import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {
  const [radios, setRadios] = useState('Ingredient');
  const [search, setSearch] = useState('');
  const { getData } = useContext(AppContext);
  const handleChangeRadio = ({ target }) => {
    setRadios(target.value);
  };

  const handleClick = async () => {
    console.log('foi');
    if (radios === 'Ingredient') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      const { meals } = await response.json();
      console.log(meals);
      getData(meals);
    }
    if (radios === 'Name') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const { meals } = await response.json();
      console.log(meals);
      getData(meals);
    }
    if (radios === 'First letter') {
      if (search.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
        const { meals } = await response.json();
        console.log(meals);
        getData(meals);
      }
    }
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

export default SearchBar;
