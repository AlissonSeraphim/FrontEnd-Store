import React from 'react';
import { Link } from 'react-router-dom';
import {
  getProductByInput,
  getCategories,
  getProductByCategoryId,
} from '../services/api';
import ProductsFound from '../components/ProductsFound';
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
    const productsLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
    if (!productsLocalStorage) {
      localStorage.setItem('cartProducts', JSON.stringify([]));
    }
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
  };

  fetchProductsByCategories = async (categoryId) => {
    const { results } = await getProductByCategoryId(categoryId);
    this.setState({
      searchResult: results,
    });
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
    const {
      search,
      categories,
      searchResult,
    } = this.state;

    return (
      <div className="bg-stone-400 min-h-screen">
        <Categories
          categories={ categories }
          onClick={ this.fetchProductsByCategories }
        />
        <Link
          data-testid="shopping-cart-button"
          to="/shopping-cart"
        >
          carrinho de compras

        </Link>
        <label className="relative block">
          <input
            type="text"
            name="search"
            data-testid="query-input"
            value={ search }
            onChange={ this.onInputChange }
            className="placeholder:italic
             placeholder:text-slate-400
             block
              bg-white
              w-full
              border
               border-slate-300
               rounded-md py-2 pl-9 pr-3
               shadow-sm focus:outline-none
                focus:border-sky-500
                 focus:ring-sky-500
                 focus:ring-1
                 sm:text-sm"
            placeholder="Digite o nome do item ou categoria desejada"
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          name="queryButton"
          onClick={ this.queryRequest }
          className="py-1.5
          px-4
          transition-colors
           bg-gray-50 border
            active:bg-gray-200
            font-medium
             border-gray-200
              text-gray-900
              rounded-lg
               hover:bg-gray-100
               disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-gray-900" width="24" height="24"><path fillRule="evenodd" d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z" /></svg>
        </button>
        {
          !search
            && (
              <p
                data-testid="home-initial-message"
                className="flex
                items-center
                justify-center
                text-2xl
                font-semibold
                 text-gray-900 dark:text-white"
              >
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
              productId={ item.id }
              addProductCart={ this.setProductToCart }
            />))
            : (
              <div
                className="bg-yellow-50
                border-b
                border-yellow-400
                 text-yellow-800
                 text-sm p-4
                 flex
                 justify-between"
              >
                <div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0
                        8 8 0 0116 0zm-7-4a1 1
                        0 11-2 0 1 1 0
                        012 0zM9 9a1 1 0 000
                        2v3a1 1 0 001 1h1a1 1
                        0 100-2v-3a1 1 0
                        00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>
                      <span className="font-bold">Info:</span>
                      Nenhum produto foi encontrado
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Home;
