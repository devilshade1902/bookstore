import React from 'react';
import './Cartitems.css';
import removeicon from '../../assets/cross_icon.png';

const Cartitems = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cartitems">
      <div className="cart-header">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((item) => (
        <div key={item.book_id} className="cart-item">
          <img src={item.image_url} alt={item.title} className="cart-item-image" />
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
          <p>{item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item.book_id)}>
            <img src={removeicon} alt="Remove" style={{width:'30px', height:"auto"}} />
          </button>
        </div>
      ))}
      <hr />
      <div className="cart-total">
        <h3>
          Total Price: $
          {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h3>
      </div>
    </div>
  );
};

export default Cartitems;

