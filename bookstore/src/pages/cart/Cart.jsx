import React from 'react';
import './Cart.css';
import Cartitems from '../../components/cartitems/Cartitems';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <Cartitems cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Cart;
