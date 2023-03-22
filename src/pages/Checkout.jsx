import React from 'react';
import propTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      inputName: '',
      inputEmail: '',
      inputCpf: '',
      inputPhone: '',
      inputCep: '',
      inputAddress: '',
      paymentMethod: '',
      formIsValid: true,
    };
  }

  componentDidMount() {
    this.loadCartProducts();
  }

  loadCartProducts = () => {
    const cartProductsInLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({
      cartProducts: cartProductsInLocalStorage,
    });
  };

  handleChangeGeneric = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = (callback) => {
    const { paymentMethod } = this.state;
    const formIsValid = paymentMethod.length > 0;
    this.setState({
      formIsValid,
    }, callback);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateForm(() => {
      const { formIsValid } = this.state;
      const { history } = this.props;
      if (formIsValid) {
        localStorage.setItem('cartProducts', JSON.stringify([]));
        history.push('/');
      }
    });
  };

  render() {
    const {
      cartProducts,
      inputName,
      inputCpf,
      inputEmail,
      inputPhone,
      inputCep,
      inputAddress,
      paymentMethod,
      formIsValid,
    } = this.state;
    return (
      <>
        <div>
          {cartProducts.map((product) => (
            <React.Fragment key={ product.name }>
              <img src={ product.img } alt={ product.name } />
              <p>{product.name}</p>
              <span>{product.quantity}</span>
              <span>
                R$
                {' '}
                {product.price}
              </span>
            </React.Fragment>
          ))}
        </div>
        <div>
          <form className="flex flex-col gap-4" onSubmit={ this.handleSubmit }>
            <label>
              Nome Completo:
              <input
                type="text"
                placeholder="Nome Completo"
                value={ inputName }
                name="inputName"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-fullname"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                placeholder="trybe@trybe.com"
                value={ inputEmail }
                name="inputEmail"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-email"
                required
              />
            </label>
            <label>
              CPF:
              <input
                type="text"
                placeholder="000-000-000-00"
                value={ inputCpf }
                name="inputCpf"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-cpf"
                required
              />
            </label>
            <label>
              Telefone:
              <input
                type="text"
                placeholder="(99) 99999-9999"
                value={ inputPhone }
                name="inputPhone"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-phone"
                required
              />
            </label>
            <label>
              CEP:
              <input
                type="text"
                placeholder="99999-999"
                value={ inputCep }
                name="inputCep"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-cep"
                required
              />
            </label>
            <label>
              Endereço:
              <input
                type="text"
                value={ inputAddress }
                name="inputAddress"
                onChange={ this.handleChangeGeneric }
                data-testid="checkout-address"
                required
              />
            </label>
            <p>
              Método de pagamento:
              {' '}
            </p>
            <label>
              Boleto
              <input
                type="radio"
                value="boleto"
                name="paymentMethod"
                checked={ paymentMethod === 'boleto' }
                onChange={ this.handleChangeGeneric }
                data-testid="ticket-payment"
              />
            </label>
            <label>
              Visa
              <input
                type="radio"
                value="visa"
                name="paymentMethod"
                checked={ paymentMethod === 'visa' }
                onChange={ this.handleChangeGeneric }
                data-testid="visa-payment"
              />
            </label>
            <label>
              MasterCard
              <input
                type="radio"
                value="master"
                name="paymentMethod"
                checked={ paymentMethod === 'master' }
                onChange={ this.handleChangeGeneric }
                data-testid="master-payment"
              />
            </label>
            <label>
              Elo
              <input
                type="radio"
                value="elo"
                name="paymentMethod"
                checked={ paymentMethod === 'elo' }
                onChange={ this.handleChangeGeneric }
                data-testid="elo-payment"
              />
            </label>
            { !formIsValid && (
              <p className="text-red-500" data-testid="error-msg">Campos inválidos</p>
            ) }
            <button
              type="submit"
              data-testid="checkout-btn"
            >
              Finalizar Pedido
            </button>
          </form>
        </div>
      </>
    );
  }
}

Checkout.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
