import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductsFound extends React.Component {
  render() {
    const {
      productName,
      productImg,
      productPrice,
      productId,
      addProductCart,
    } = this.props;

    return (
      <div className="ProductsCard" data-testid="product">
        <Link to={ `/product/${productId}` } data-testid="product-detail-link">
          <h3>{productName}</h3>
          <img src={ productImg } alt={ productName } />
          <p>{productPrice}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ () => addProductCart(
            productName,
            productPrice,
            productId,
            productImg,
          ) }
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

ProductsFound.propTypes = {
  productName: PropTypes.string.isRequired,
  productImg: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  addProductCart: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ProductsFound;
