import React from 'react';
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
    return (
      cartProducts.length === 0 ? (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      )
        : (
          cartProducts.map((product) => (
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
          ))

        )
    );
  }
}

export default ShoppingCart;
