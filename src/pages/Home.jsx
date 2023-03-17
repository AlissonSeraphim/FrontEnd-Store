import React from 'react';
import { getCategories } from '../services/api';
import Categories from '../components/Categories';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      categories: [],
    };
  }

  componentDidMount() {
    return this.fetchCategories();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  render() {
    const { search, categories } = this.state;
    return (
      <>
        <Categories categories={ categories } />
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
