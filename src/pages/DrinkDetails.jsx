import React from 'react';
import PropTypes from 'prop-types';

function DrinksDetails({ match: { params: { id } } }) {
  return (
    <div>
      {`Drinks Details: ${id}`}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinksDetails;
