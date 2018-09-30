import axios from 'axios';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_ITEM,
  APPLY_PROMO,
  INVALID_PROMO,
  FINAL_CHECKOUT,
  INVALID_CHECKOUT
} from './types';

export const getProducts = () => async dispatch => {
  const products = await axios.get('http://localhost:9001/products');

  dispatch({
    type: GET_PRODUCTS,
    payload: products.data
  });
};

export const addToCart = item => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: item
  });
};

export const updateQuantity = (sku, quantity) => dispatch => {
  dispatch({
    type: UPDATE_QUANTITY,
    payload: { sku, quantity }
  });
};

export const removeItem = sku => dispatch => {
  dispatch({
    type: REMOVE_ITEM,
    payload: sku
  });
};

export const applyPromo = promo => dispatch => {
  let promoCode = { promoCode: promo };

  let config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios
    .post('http://localhost:9001/promocode', promoCode, config)
    .then(response => {
      console.log(response);
      dispatch({
        type: APPLY_PROMO,
        payload: response
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: INVALID_PROMO,
        payload: 'Invalid Promo'
      });
    });
};

export const finalCheckout = (basket, cardNumber) => dispatch => {
  let checkout = { basket, cardNumber };

  const config = {
    headers: { 'Access-Control-Allow-Origin': '*' }
  };

  axios
    .post('http://localhost:9001/checkout', checkout, config)
    .then(response => {
      console.log(response);
      dispatch({
        type: FINAL_CHECKOUT,
        payload: response.data.msg
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: INVALID_CHECKOUT,
        payload:
          'Sorry there was an error with your order, Please reach us at 555-555-5555'
      });
    });

};
