import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/Recipes';
import AppContext from '../context/AppContext';

function Meals() {
  const { data } = useContext(AppContext);
  const MAX_SIZE = 12;
  const renderData = data.length > MAX_SIZE ? data.slice(0, MAX_SIZE) : data;
  return (
    <div>
      <Header title="Meals" />
      {data.length > 1 && renderData
        .map((meal, index) => (<RecipeCard
          index={ index }
          key={ meal.idMeal }
          name={ meal.strMeal }
          src={ meal.strMealThumb }
        />))}
    </div>
  );
}

export default Meals;
