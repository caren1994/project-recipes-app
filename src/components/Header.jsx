import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const renderSearchIcon = () => history.location.pathname !== '/profile'
    && history.location.pathname !== '/done-recipes'
    && history.location.pathname !== '/favorite-recipes';
    // se a pagina for diferente dessas opçoes acima mostra o incone de procurar

  return (
    <section>
      <div className="flex justify-between mt-5 mb-8">
        <button
          className="box-border border-1 border-orange-400"
          type="button"
          onClick={ () => history.push('/profile') } // muda para a pagina de profile
        >
          <img src={ ProfileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
        </button>
        <h2
          className="  text-3xl
       box-border border-b-2 border-orange-400 "
          data-testid="page-title"
        >
          {title}

        </h2>
        { renderSearchIcon() && ( // se nao for aqquelas paginas entao o função é verdadeira e mostra o botao de procurar
          <button
            type="button"
            onClick={ () => setShowInput(!showInput) } // quando clicar no botao altera o estado para verdadeiro e falso um toggle
          >
            <img
              data-testid="search-top-btn"
              src={ SearchIcon }
              alt="Search Icon"
            />
          </button>
        )}
      </div>
      {showInput && <SearchBar // se o botao tiver alterado para verdadeiro entao ele mostra o searchbar
        pathname={ history.location.pathname }
        history={ history }
        // e envia para o searchbar o history e o pathname
      />}
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default Header;
