import React from 'react';
import { Link } from 'react-router-dom';
import ProductInCart from '../components/ProductInCart';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
  }

  componentDidMount() {
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
    if (productsLocalStorage) {
      this.setState({ cartProducts: productsLocalStorage });
    } else {
      localStorage.setItem('cartProducts', JSON.stringify([]));
    }
  }

  removeProductInCart = (productId) => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));

    const indexProduct = productsLocalStorage
      .findIndex((product) => product.id === productId);

    productsLocalStorage.splice(indexProduct, 1);

    localStorage.setItem('cartProducts', JSON.stringify(productsLocalStorage));

    this.setState({
      cartProducts: productsLocalStorage,
    });
  };

  incrementProductInCart = (productId) => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));

    const indexProduct = productsLocalStorage
      .findIndex((product) => product.id === productId);

    const productInCart = productsLocalStorage[indexProduct];

    productInCart.quantity += 1;

    localStorage.setItem('cartProducts', JSON.stringify(productsLocalStorage));

    this.setState({
      cartProducts: productsLocalStorage,
    });
  };

  decrementProductInCart = (productId) => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));

    const indexProduct = productsLocalStorage
      .findIndex((product) => product.id === productId);

    const productInCart = productsLocalStorage[indexProduct];

    if (productInCart.quantity === 1) return;

    productInCart.quantity -= 1;

    localStorage.setItem('cartProducts', JSON.stringify(productsLocalStorage));

    this.setState({
      cartProducts: productsLocalStorage,
    });
  };

  render() {
    const { cartProducts } = this.state;
    const imageUrl = 'https://static.thenounproject.com/png/538404-200.png';
    return (
      cartProducts.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="flex-col max-w-sm rounded overflow-hidden shadow-lg text-center"
          >
            <img
              className="w-20 mx-auto"
              src={ imageUrl }
              alt="Empty Cart"
            />
            <h1
              className="font-bold text-3xl mb-2 px-6 py-4"
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h1>
          </div>
        </div>
      )
        : (
          <>
            {cartProducts.map((product) => (
              <ProductInCart
                key={ product.id }
                productName={ product.name }
                productPrice={ product.price }
                productQuantity={ product.quantity }
                productImg={ product.img }
                productId={ product.id }
                onClickRemoveProductButton={ this.removeProductInCart }
                incrementProductInCart={ this.incrementProductInCart }
                decrementProductInCart={ this.decrementProductInCart }
              />
            ))}
            <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
          </>

        )
    );
  }
}

export default ShoppingCart;
