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

  setProductToCart = (name, price, id, img) => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));

    const indexProduct = productsLocalStorage.findIndex((product) => product.id === id);

    const productCheckInCart = indexProduct >= 0;

    if (productCheckInCart) {
      const productInCart = productsLocalStorage[indexProduct];

      productInCart.quantity += 1;
    } else {
      const product = {
        name,
        price,
        id,
        img,
        quantity: 1,
      };
      productsLocalStorage.push(product);
    }

    localStorage.setItem('cartProducts', JSON.stringify(productsLocalStorage));
  };

  render() {
    const { product } = this.state;
    const productIsLoad = Object.keys(product).length > 0;
    return (
      productIsLoad && (
        <div className="flex bg-gray-100 min-h-screen items-center justify-between">
          <div
            className="
          min-h-[50%]
          bg-white p-10
          rounded-lg
          justify-center
          items-center
          shadow-xl"
          >
            <h1 data-testid="product-detail-name" className="text-xl">{product.title}</h1>
            <img
              src={ product.pictures[0].url }
              alt={ product.title }
              data-testid="product-detail-image"
            />
          </div>
          <div
            className="flex
            min-w-[50%]
          min-h-screen
          bg-white p-10
          rounded-lg
          items-center
          shadow-xl
          "
          >
            <h2 data-testid="product-detail-price">
              {' '}
              R$
              {' '}
              {product.price}
            </h2>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.setProductToCart(
                product.title,
                product.price,
                product.id,
                product.thumbnail,
              ) }
            >
              Adicionar ao Carrinho

            </button>
            <button
              onClick={ this.handleClickRedirectButton }
              data-testid="shopping-cart-button"
            >
              Ir para o carrinho
            </button>
          </div>
        </div>
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
