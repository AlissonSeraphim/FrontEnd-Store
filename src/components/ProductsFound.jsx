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
    } = this.props;

    return (
      <div className="ProductsCard" data-testid="product">
        <Link to={ `/product/${productId}` } data-testid="product-detail-link">
          <h3>{productName}</h3>
          <img src={ productImg } alt={ productName } />
          <p>{productPrice}</p>
        </Link>
      </div>
    );
  }
}

ProductsFound.propTypes = {
  productName: PropTypes.string.isRequired,
  productImg: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ProductsFound;
