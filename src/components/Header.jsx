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

  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img src={ ProfileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </button>
      { renderSearchIcon() && (
        <button
          type="button"
          onClick={ () => setShowInput(!showInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="Search Icon"
          />
        </button>
      )}
      {showInput && <SearchBar
        pathname={ history.location.pathname }
        history={ history }
      />}
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default Header;
