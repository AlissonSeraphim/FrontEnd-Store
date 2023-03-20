import React from 'react';
import PropTypes from 'prop-types';

class ProductInCart extends React.Component {
  render() {
    const {
      productName,
      productImg,
      productPrice,
      productQuantity,
    } = this.props;

    return (
      <div>
        <img src={ productImg } alt={ productName } />
        <p data-testid="shopping-cart-product-name">{productName}</p>
        <p>{productPrice}</p>
        <p data-testid="shopping-cart-product-quantity">{productQuantity}</p>
      </div>
    );
  }
}

ProductInCart.propTypes = {
  productName: PropTypes.string.isRequired,
  productImg: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productQuantity: PropTypes.number.isRequired,
};

export default ProductInCart;
