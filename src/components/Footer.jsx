import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

function Footer() {
  return (// renderiza o footer com link que pode te enviar para pagina de comida e bebida
  // tem que posicionar ele de forma fixa por isso usamos o css
    <footer
      data-testid="footer"
      className=" footer bg-orange-400"
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="meals"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
