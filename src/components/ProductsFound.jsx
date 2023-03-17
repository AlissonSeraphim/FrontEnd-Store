import React from 'react';
import PropTypes from 'prop-types';

class ProductsFound extends React.Component {
  render() {
    const {
      productName,
      productImg,
      productPrice,
    } = this.props;

    return (
      <div className="ProductsCard" data-testid="product">
        <h3>{productName}</h3>
        <img src={ productImg } alt={ productName } />
        <p>{productPrice}</p>
      </div>
    );
  }
}

ProductsFound.propTypes = {
  productName: PropTypes.string.isRequired,
  productImg: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};

export default ProductsFound;
