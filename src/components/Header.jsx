import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../images/searchIcon.svg';
import { ReactComponent as ProfileIcon } from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  return (
    <section>
      <h2 data-testid="page-title">{title}</h2>
      <ProfileIcon
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />
      <SearchIcon
        data-testid="search-top-btn"
        onClick={ () => setShowInput(!showInput) }
      />
      {showInput && <SearchBar />}
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default Header;
