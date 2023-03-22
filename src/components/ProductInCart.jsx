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
      <div className="flex items-center justify-between rounded-lg shadow-lg m-5 p-1">
        <div className="flex items-center">
          <img className="p-5" src={ productImg } alt={ productName } />
          <p
            className=""
            data-testid="shopping-cart-product-name"
          >
            {productName}
          </p>
        </div>
        <div className="flex">
          <button
            className="px-5"
            onClick={ () => decrementProductInCart(productId) }
            data-testid="product-decrease-quantity"
          >
            -
          </button>
          <p
            className="px-5"
            data-testid="shopping-cart-product-quantity"
          >
            {productQuantity}
          </p>
          <button
            className="px-5"
            onClick={ () => incrementProductInCart(productId) }
            data-testid="product-increase-quantity"
          >
            +
          </button>
          <p className="px-5">
            R$
            {productPrice}
          </p>
          <button
            className="px-5"
            onClick={ () => onClickRemoveProductButton(productId) }
            data-testid="remove-product"
          >
            X
          </button>
        </div>
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
