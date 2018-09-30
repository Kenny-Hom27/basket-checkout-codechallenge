import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CheckoutItem extends Component {

  handleChange = (e) => {
    this.props.updateQuantity(this.props.item.sku, e.target.value)
  }

  removeItem = () => {
    this.props.removeItem(this.props.item.sku)
  }

  render() {
    const { item } = this.props;
    return (
      <div className="row checkout-item">
        <div className="col-md-4">{item.name}</div>
        <select className="col-md-2" value={item.quantity} onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div className="col-md-1 offset-md-2">${(item.price * item.quantity).toFixed(2)}</div>
        <button className="btn btn-danger col-md-2 offset-md-1" onClick={this.removeItem}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.basket.products,
    basket: state.basket.basket
  };
};

export default connect(mapStateToProps, actions)(CheckoutItem);
