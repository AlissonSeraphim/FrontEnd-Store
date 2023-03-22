import React from 'react';
import propTypes from 'prop-types';

class ValidationCard extends React.Component {
  render() {
    const {
      email,
      rating,
      productReview,
    } = this.props;
    return (
      <>
        <p data-testid="review-card-email">{email}</p>
        <p data-testid="review-card-rating">{rating}</p>
        <span data-testid="review-card-evaluation">{productReview}</span>
      </>
    );
  }
}

ValidationCard.propTypes = {
  email: propTypes.string.isRequired,
  rating: propTypes.string.isRequired,
  productReview: propTypes.string,
};
ValidationCard.defaultProps = {
  productReview: '',
};

export default ValidationCard;
