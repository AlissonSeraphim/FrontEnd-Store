import React from 'react';
import propTypes from 'prop-types';
import ValidationCard from './ValidationCard';

class ProductFormEvaluation extends React.Component {
  render() {
    const {
      inputEmail,
      handleChangeGeneric,
      rate,
      productReview,
      formIsInvalid,
      handleSubmit,
      reviews,
    } = this.props;

    const rates = [Number('1'), Number('2'), Number('3'), Number('4'), Number('5')];

    return (
      <form className="flex flex-col">
        <label>
          Email:
          <input
            name="inputEmail"
            type="email"
            data-testid="product-detail-email"
            placeholder="teste@trybe.com"
            value={ inputEmail }
            onChange={ handleChangeGeneric }
            required
          />
        </label>
        <br />
        <label>
          Nota:
          { rates.map((rateOption) => (
            <label key={ rateOption }>
              {rateOption}
              <input
                type="radio"
                checked={ Number(rate) === rateOption }
                onChange={ handleChangeGeneric }
                name="rate"
                data-testid={ `${rateOption}-rating` }
                value={ rateOption }
              />
            </label>
          )) }
        </label>
        <label>
          Comentário sobre o produto:
          <textarea
            name="productReview"
            cols="30"
            rows="10"
            value={ productReview }
            onChange={ handleChangeGeneric }
            data-testid="product-detail-evaluation"
          />
        </label>
        {formIsInvalid && (
          <p className="text-red-500" data-testid="error-msg">Campos inválidos</p>
        )}
        <button
          type="button"
          onClick={ handleSubmit }
          data-testid="submit-review-btn"
        >
          Enviar
        </button>
        {reviews.map((review) => (
          <ValidationCard
            key={ review.id }
            email={ review.email }
            rating={ review.rating }
            productReview={ review.productReview }
          />
        ))}
      </form>
    );
  }
}

ProductFormEvaluation.propTypes = {
  inputEmail: propTypes.string.isRequired,
  handleChangeGeneric: propTypes.func.isRequired,
  rate: propTypes.string.isRequired,
  productReview: propTypes.string.isRequired,
  formIsInvalid: propTypes.bool.isRequired,
  handleSubmit: propTypes.func.isRequired,
  reviews: propTypes.arrayOf(propTypes.shape({
    email: propTypes.string.isRequired,
    rating: propTypes.string.isRequired,
  })).isRequired,
};

export default ProductFormEvaluation;
