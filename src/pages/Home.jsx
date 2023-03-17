import React from 'react';
import { Link } from 'react-router-dom';
import { getProductByInput } from '../services/api';
import ProductsFound from '../components/ProductsFound';
import { getCategories } from '../services/api';
import Categories from '../components/Categories';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchResult: [],
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


  queryRequest = async () => {
    const { search } = this.state;

    const response = await getProductByInput(search);
    const { results } = response;

    this.setState({ searchResult: results });
  };

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });


  render() {
    const {
      search,
      categories,
      searchResult,
    } = this.state;

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
            data-testid="query-input"
            value={ search }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          name="queryButton"
          onClick={ this.queryRequest }
        >
          Pesquisar
        </button>
        {
          !search
            && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }
        <div>
          { (searchResult.length > 0) ? searchResult.map((item) => (
            <ProductsFound
              key={ item.id }
              productName={ item.title }
              productImg={ item.thumbnail }
              productPrice={ item.price }
            />)) : (<h1>Nenhum produto foi encontrado</h1>)}
        </div>
      </>
    );
  }
}

export default Home;
