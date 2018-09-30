import {
  GET_PRODUCTS,
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_ITEM,
  APPLY_PROMO,
  INVALID_PROMO,
  FINAL_CHECKOUT,
  INVALID_CHECKOUT
} from '../actions/types';

const INITIAL_STATE = {
  products: [],
  basket: [],
  itemCount: 0,
  subTotal: 0,
  discount: 0,
  invalidPromo: "",
  checkoutResult: "",
  invalidCheckout: false
};

function addToBasket(basket, item) {
  let alreadyInBasket = false;

  for (let i = 0; i < basket.length; i++) {
    let sku = basket[i].sku;
    if (sku === item.sku) {
      if (basket[i].quantity < 10) {
        basket[i].quantity++;
      }
      alreadyInBasket = true;
    }
  }

  if (!alreadyInBasket) {
    basket.push({ sku: item.sku, quantity: 1 });
  }

  return basket;
}

function calculateItemCount(basket) {
  let count = 0;

  for (let key in basket) {
    count += basket[key].quantity;
  }

  return count;
}

function updateQuantity(basket, item) {
  for (let i = 0; i < basket.length; i++) {
    let sku = item.sku;
    if (basket[i].sku === sku) {
      basket[i].quantity = parseInt(item.quantity, 10);
    }
  }

  return basket;
}

function removeItem(basket, sku) {
  return basket.filter(basketItem => {
    return basketItem.sku !== sku;
  });
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        basket: addToBasket(state.basket, action.payload),
        itemCount: calculateItemCount(state.basket)
      };
    case UPDATE_QUANTITY:
      let updateBasket = updateQuantity([...state.basket], action.payload);
      return {
        ...state,
        basket: updateBasket,
        itemCount: calculateItemCount(updateBasket)
      };
    case REMOVE_ITEM:
      let removeFromBasket = removeItem([...state.basket], action.payload);
      return {
        ...state,
        basket: removeFromBasket,
        itemCount: calculateItemCount(removeFromBasket)
      };
    case APPLY_PROMO:
      return {
        ...state, discount: action.payload.data.amount, invalidPromo: ""
      }
    case INVALID_PROMO:
      return {
        ...state, invalidPromo: action.payload
      }
    case FINAL_CHECKOUT:
      return {
        ...state, checkoutResult: action.payload
      }
    case INVALID_CHECKOUT:
      return {
        ...state, checkoutResult: action.payload, invalidCheckout: true
      }
    default:
      return state;
  }
}
