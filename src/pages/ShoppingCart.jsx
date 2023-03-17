import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
    };
  }

  render() {
    const { cartProducts } = this.state;
    return (
      cartProducts.length === 0 && (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      )
    );
  }
}

export default ShoppingCart;
