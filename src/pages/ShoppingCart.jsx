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
            />
          ))

        )
    );
  }
}

export default ShoppingCart;
