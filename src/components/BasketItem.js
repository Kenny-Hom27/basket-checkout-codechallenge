import React from 'react'

const BasketItem = (props) => {

  const { product, addItemToCart } = props

  return(
    <div className="row product-item">
      <div className="col-md-4">{product.name}</div>
      <div className="col-md-4">${product.price}</div>
      <div className="col-md-4">
        <button className="btn btn-primary" onClick={() => addItemToCart(product)}>Add to basket</button>
      </div>

    </div>
  )
}



export default BasketItem;
