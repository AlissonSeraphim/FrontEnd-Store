import React from 'react';
import PropTypes from 'prop-types';

class ProductInCart extends React.Component {
  render() {
    const {
      productName,
      productImg,
      productPrice,
      productQuantity,
      productId,
      onClickRemoveProductButton,
      incrementProductInCart,
      decrementProductInCart,
    } = this.props;

    return (
      <div>
        <button
          onClick={ () => onClickRemoveProductButton(productId) }
          data-testid="remove-product"
        >
          X
        </button>
        <img src={ productImg } alt={ productName } />
        <p data-testid="shopping-cart-product-name">{productName}</p>
        <p>{productPrice}</p>
        <button
          onClick={ () => decrementProductInCart(productId) }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{productQuantity}</p>
        <button
          onClick={ () => incrementProductInCart(productId) }
          data-testid="product-increase-quantity"
        >
          +
        </button>
      </div>
    );
  }
}

ProductInCart.propTypes = {
  productName: PropTypes.string.isRequired,
  productImg: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productQuantity: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  onClickRemoveProductButton: PropTypes.func.isRequired,
  incrementProductInCart: PropTypes.func.isRequired,
  decrementProductInCart: PropTypes.func.isRequired,
};

export default ProductInCart;
