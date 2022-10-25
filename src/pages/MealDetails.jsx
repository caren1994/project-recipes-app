import React from 'react';
import PropTypes from 'prop-types';

function MealsDetails({ match: { params: { id } } }) {
  return (
    <div>
      {`Meal Details: ${id}`}
    </div>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealsDetails;
