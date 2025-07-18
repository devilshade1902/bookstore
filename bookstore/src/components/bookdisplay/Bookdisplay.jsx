import React from 'react';
import './Bookdisplay.css';

const Bookdisplay = ({ book, addToCart, cartItems = [], incrementQuantity, decrementQuantity }) => {
  const cartItem = cartItems.find((item) => item.book_id === book.book_id) || null;
  const isInCart = !!cartItem;

  return (
    <div className="bookdisplay">
      <div className="bookdisplay-left">
        <img src={book.image_url} alt="" />
      </div>
      <div className="bookdisplay-right">
        <p>Title</p>
        <h2>{book.title}</h2>
        <p>Price</p>
        <h3>₹{book.price}</h3>
        <p>Category</p>
        <h4>{book.category}</h4>
        {isInCart ? (
          <div className="quantity-counter">
            <button
              onClick={() => decrementQuantity(book.book_id)}
              className="btn btn-secondary"
              disabled={cartItem?.quantity <= 1}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              onClick={() => incrementQuantity(book.book_id)}
              className="btn btn-secondary"
            >
              +
            </button>
          </div>
        ) : (
          <button onClick={() => addToCart(book)} className="btn btn-primary">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Bookdisplay;