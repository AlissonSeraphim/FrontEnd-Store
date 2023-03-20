import React from 'react';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);

    this.setState({
      product,
    });
  };

  handleClickRedirectButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  render() {
    const { product } = this.state;
    const productIsLoad = Object.keys(product).length > 0;
    return (
      productIsLoad && (
        <>
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <img
            src={ product.pictures[0].url }
            alt={ product.title }
            data-testid="product-detail-image"
          />
          <h2 data-testid="product-detail-price">
            {' '}
            R$
            {' '}
            {product.price}
          </h2>
          <button
            onClick={ this.handleClickRedirectButton }
            data-testid="shopping-cart-button"
          >
            Ir para o carrinho
          </button>
        </>
      )
    );
  }
}

Product.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Product;
