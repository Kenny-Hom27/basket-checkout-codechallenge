import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import BasketCount from './BasketCount';

class Basket extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  addItemToCart = value => {
    this.props.addToCart(value);
  };

  render() {
    let items = this.props.products.map((product, index) => {
      return (
        <BasketItem
          key={index}
          product={product}
          addItemToCart={this.addItemToCart}
        />
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6"><h1>Product List View</h1></div>
          <BasketCount />
        </div>
        <hr />
        {items.length ? items : <div>No Items</div>}
        <hr />
        <Link to="/checkout">
          <button className="btn purple-link float-right">Proceed to checkout</button>
        </Link>
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

export default connect(
  mapStateToProps,
  actions
)(Basket);
