import React, { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';

function Meals() {
  const { data } = useContext(AppContext);
  return (
    <div>
      <Header title="Meals" />
      {data.length > 1 && data.map((meal) => <p key={ meal.idMeal }>{ meal.strMeal }</p>)}
    </div>
  );
}

export default Meals;
