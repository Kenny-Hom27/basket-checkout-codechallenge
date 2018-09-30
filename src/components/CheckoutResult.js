import React, { Component } from 'react';
import { connect } from 'react-redux';

class CheckoutResult extends Component {
  render() {
    return (
      <div>
        {this.props.invalideCheckout ? (
          <div className="text-danger">{this.props.checkoutResult}</div>
        ) : (
          <div className="text-success">{this.props.checkoutResult}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    checkoutResult: state.basket.checkoutResult,
    invalidCheckout: state.basket.invalidCheckout
  };
};

export default connect(mapStateToProps)(CheckoutResult);
