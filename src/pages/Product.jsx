import React from 'react';
import propTypes from 'prop-types';
import { getProductById } from '../services/api';
import ProductFormEvaluation from '../components/ProductFormEvaluation';

class Product extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {},
      rate: '',
      inputEmail: '',
      productReview: '',
      formIsInvalid: false,
      reviews: [],
    };
  }

  componentDidMount() {
    this.loadProduct();

    const { match } = this.props;
    const { id } = match.params;

    const reviewsInLocalStorage = JSON.parse(localStorage.getItem(id));

    if (!reviewsInLocalStorage) {
      localStorage.setItem(id, JSON.stringify([]));
    } else {
      this.setState({
        reviews: reviewsInLocalStorage,
      });
    }
  }

  loadProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);

    this.setState({
      product,
    });
  };

  handleClickRedirectButton = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
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

  handleChangeGeneric = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  validateForm = (callback) => {
    const { inputEmail, rate } = this.state;

    const emailRegEx = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    const inputEmailIsValid = emailRegEx.test(inputEmail);
    const rateIsValid = rate.length > 0;

    const validations = [inputEmailIsValid, rateIsValid];

    const formIsValid = validations.every((validation) => validation);

    this.setState({
      formIsInvalid: !formIsValid,
    }, callback);
  };

  handleSubmit = () => {
    this.validateForm(() => {
      const { formIsInvalid } = this.state;

      if (!formIsInvalid) {
        this.addReview();
      }
    });
  };

  addReview = () => {
    const {
      inputEmail,
      productReview,
      rate,
    } = this.state;
    const { match } = this.props;
    const { id } = match.params;

    const reviewsInLocalStorage = JSON.parse(localStorage.getItem(id));

    const lastElement = reviewsInLocalStorage[reviewsInLocalStorage.length - 1];

    const reviewItem = {
      id: `${id}-${lastElement ? lastElement.id + 1 : 1}`,
      email: inputEmail,
      productReview,
      rating: rate,
    };

    reviewsInLocalStorage.push(reviewItem);

    localStorage.setItem(id, JSON.stringify(reviewsInLocalStorage));

    this.setState({
      reviews: reviewsInLocalStorage,
      inputEmail: '',
      rate: '',
      productReview: '',
    });
  };

  render() {
    const {
      product,
      rate,
      inputEmail,
      productReview,
      formIsInvalid,
      reviews,
    } = this.state;
    const productIsLoad = Object.keys(product).length > 0;
    return (
      productIsLoad && (
        <div className="flex bg-gray-100 min-h-screen items-center justify-between">
          <div
            className="
          min-h-[50%]
          bg-white p-10
          rounded-lg
          justify-center
          items-center
          shadow-xl"
          >
            <h1 data-testid="product-detail-name" className="text-xl">{product.title}</h1>
            <img
              src={ product.pictures[0].url }
              alt={ product.title }
              data-testid="product-detail-image"
            />
          </div>
          <div
            className="flex
            min-w-[50%]
          min-h-screen
          bg-white p-10
          rounded-lg
          items-center
          shadow-xl
          "
          >
            <h2 data-testid="product-detail-price">
              {' '}
              R$
              {' '}
              {product.price}
            </h2>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.setProductToCart(
                product.title,
                product.price,
                product.id,
                product.thumbnail,
              ) }
            >
              Adicionar ao Carrinho

            </button>
            <button
              onClick={ this.handleClickRedirectButton }
              data-testid="shopping-cart-button"
            >
              Ir para o carrinho
            </button>
          </div>
          <ProductFormEvaluation
            inputEmail={ inputEmail }
            handleChangeGeneric={ this.handleChangeGeneric }
            rate={ rate }
            productReview={ productReview }
            formIsInvalid={ formIsInvalid }
            handleSubmit={ this.handleSubmit }
            reviews={ reviews }
          />
        </div>
      )
    );
  }
}

Product.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Product;
