import React, { Component } from 'react';
import { connect } from 'react-redux';

class BasketCount extends Component {

  render() {
    const { itemCount } = this.props;
    return (
      <div className="row ml-auto">
        <div className="purple-link basket-count-info">My Basket</div>
        <div className="basket-count-info">{itemCount}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemCount: state.basket.itemCount
  };
};


export default connect(mapStateToProps)(BasketCount);
