import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function SearchBar({ pathname, history }) {
  // recebe o pathname e o history do header
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
      }// caso o retorno da api seja 1 recipe envia paraa a pagina de detalhes
      if (pathname === '/drinks') {
        history.push(`drinks/${data[0].idDrink}`);// faz o formato da rota pega o que retornou da api na posição 0 e pega a chave id que é necessario na rota
      }// caso o retorno da api seja 1 recipe envia paraa a pagina de detalhes
    }
  });

  const handleClick = () => {
    const searchParameter = {
      pathname,
      searchOption: radios,
      searchInput: search,
    };
    getSearchSetup(searchParameter);// função feita do provider para enviar para a requissição da api
  };
  // recebe o parameter enviado do header , recebe o valor que foi digitado no input, e recebe qual o valor do radio

  return (
    <section>
      <label htmlFor="search-input" className="flex justify-center">

        <input
          className="
          box-border w-32 border-2 border-gray-400 rounded-md mb-2"
          type="text"
          id="search-input"
          value={ search }
          placeholder="search"
          onChange={ ({ target }) => setSearch(target.value) }
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient-search" className="font-medium">
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
        <label htmlFor="name-search" className="font-medium">
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
        <label htmlFor="first-letter-search" className="mb-8 font-medium">
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
          className=" ml-4 box-border
           border-2 rounded-md border-gray-400 bg-orange-400 font-medium mb-5"
          type="button"
          onClick={ handleClick }
          data-testid="exec-search-btn"
        >
          Search

        </button>
      </div>

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
