import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Basket from './components/Basket';
import Checkout from './components/Checkout';
import CheckoutResult from './components/CheckoutResult';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Basket} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/checkoutResult" component={CheckoutResult} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
