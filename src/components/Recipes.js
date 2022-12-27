import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function RecipeCard({ name, src, index, id }) { // props recebidas do componente via props do meals ou do drinks
  // componente dinaamico que hora renderiza
  // a bebida hora a comida de acordo com a pagina que se esta
  const history = useHistory();

  return (
    <Link to={ `${history.location.pathname}/${id}` }>
      {/* redireciona para a tela de detalhes caso seja apenas 1 receita */}

      <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
        <img
          width="200px"
          data-testid={ `${index}-card-img` }
          src={ src }
          alt={ name }
        />
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      </div>

      {/* renderiza oq foi passado por props como o name , o src,e usa o index como parte do datatestid */}
    </Link>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  key: PropTypes.string,
}.isRequired;

export default RecipeCard;
