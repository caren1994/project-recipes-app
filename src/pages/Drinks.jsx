import React, { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Drinks() {
  const { data } = useContext(AppContext);
  return (
    <div>
      <Header title="Drinks" />
      {data.length > 1 && data
        .map((drinks) => <p key={ drinks.idDrink }>{ drinks.strDrink }</p>)}
    </div>
  );
}

export default Drinks;
