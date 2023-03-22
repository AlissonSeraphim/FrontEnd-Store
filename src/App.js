import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product/:id" render={ (props) => <Product { ...props } /> } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
