import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          carrinho de compras

        </Link>
        <label>
          <input
            type="text"
            name="search"
            value={ search }
            onChange={ this.onInputChange }
          />
        </label>
        {
          !search
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }
      </>
    );
  }
}

export default Home;
