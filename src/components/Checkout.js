import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BasketCount from './BasketCount';
import CheckoutItem from './CheckoutItem';

class Checkout extends Component {
  state = {
    error: '',
    creditCard: '',
    promo: '',
    buttonDisabled: true
  };

  componentDidMount() {
    if (this.props.basket.length) {
      this.setState({
        buttonDisabled: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.basket.length && prevProps.basket !== this.props.basket) {
      this.setState({
        buttonDisabled: true
      });
    }
  }

  renderCheckoutItems = (basket, products) => {
    let checkoutItems = [];

    if (!basket) return;

    for (let i = 0; i < basket.length; i++) {
      let sku = basket[i].sku;
      let quantity = basket[i].quantity;
      let item = products.filter(
        cartItem => cartItem.sku === parseInt(sku, 10)
      )[0];

      item = { ...item, quantity: quantity };

      checkoutItems.push(item);
    }

    return checkoutItems;
  };

  calculateSubtotal = () => {
    let total = 0;
    let items = this.renderCheckoutItems(
      this.props.basket,
      this.props.products
    );

    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  };

  handlePromo = e => {
    this.setState({
      promo: e.target.value
    });
  };

  handlePromoSubmit = () => {
    this.props.applyPromo(this.state.promo);
  };

  handleCreditCard = e => {
    this.setState({
      creditCard: e.target.value
    });
  };

  validCreditCard = value => {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0,
      // nDigit = 0,
      bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  };

  onSubmit = () => {
    if (!this.props.basket.length) {
      this.setState({
        error: 'No items in basket'
      });
      return;
    }

    if (
      !this.validCreditCard(this.state.creditCard) ||
      !this.state.creditCard
    ) {
      this.setState({
        error: 'Invalid credit Card'
      });
      return;
    }

    this.props.finalCheckout(this.props.basket, this.state.creditCard);
    this.props.history.push('/checkoutResult');
  };

  render() {
    const { basket, products, discount } = this.props;

    const checkoutItems = this.renderCheckoutItems(basket, products).map(
      (item, index) => {
        return <CheckoutItem key={index} item={item} />;
      }
    );

    const subtotal = this.calculateSubtotal().toFixed(2);

    const promoPrice = ((subtotal * discount) / 100).toFixed(2);

    const basketTotal = (subtotal - promoPrice).toFixed(2);

    return (
      <div className="container">
        <div className="row">
          <h1>Checkout View</h1>
          <BasketCount cart={basket} />
        </div>
        <hr />
        <div className="row">
          <Link to="/">
            <button className="btn purple-link">Continue Shipping</button>
          </Link>
        </div>
        <br />

        <div className="row" style={{ paddingBottom: '20px' }}>
          <div className="col-md-4 font-weight-bold">Product Name</div>
          <div className="col-md-4 font-weight-bold">Quantity</div>
          <div className="col-md-4 font-weight-bold">Price</div>
        </div>

        <div>{checkoutItems}</div>
        <hr />

        <div className="row">
          <div className="col-md-4 text-primary">Enter Promo Code</div>
          <input
            className="col-md-1 offset-md-1"
            type="text"
            onChange={this.handlePromo}
          />
          <button
            className="btn btn-primary col-md-2 offset-md-2"
            onClick={this.handlePromoSubmit}
          >
            Apply
          </button>
        </div>
        {this.props.invalidPromo ? (
          <div className="row">
            <div className="text-danger col-md-2 offset-md-5">
              {this.props.invalidPromo}
            </div>
          </div>
        ) : null}
        <hr />

        <div className="row center-text">
          <div className="col-md-6 text-primary">Subtotal</div>
          <div className="col-md-6">${subtotal}</div>
        </div>
        <br />

        <div className="row center-text">
          <div className="col-md-6 text-primary">
            Promotional Discount Amount
          </div>
          <div className="col-md-6 text-danger">-${promoPrice}</div>
        </div>
        <br />

        <div className="row center-text">
          <div className="col-md-6 text-primary">Basket Total</div>
          <div className="col-md-6">${basketTotal}</div>
        </div>
        <br />

        <div className="row center-text">
          <div className="col-md-6 text-primary">
            Enter Credit Card Number
          </div>
          <input
            className="col-md-4"
            type="text"
            onChange={this.handleCreditCard}
          />
        </div>
        <br />

        <div className="row text-danger float-right">
          {this.state.error ? this.state.error : null}
        </div>
        <br />

        <div>
          <button
            className="btn purple-link col-md-3 float-right"
            onClick={this.onSubmit}
            disabled={this.state.buttonDisabled}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.basket.products,
    basket: state.basket.basket,
    discount: state.basket.discount,
    invalidPromo: state.basket.invalidPromo
  };
};

export default connect(
  mapStateToProps,
  actions
)(Checkout);
