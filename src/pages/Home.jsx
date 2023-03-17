import React from 'react';
import { getProductByInput } from '../services/api';
import ProductsFound from '../components/ProductsFound';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      searchResult: [],
    };
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

  render() {
    const {
      search,
      searchResult,
    } = this.state;

    return (
      <>
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
