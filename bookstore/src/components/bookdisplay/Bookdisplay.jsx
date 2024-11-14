import React from 'react';
import './Bookdisplay.css';

const Bookdisplay = ({ book, addToCart }) => {
  return (
    <div className="bookdisplay">
      <div className="bookdisplay-left">
        <img src={book.image_url} alt="" />
      </div>
      <div className="bookdisplay-right">
        <p>Title</p>
        <h2>{book.title}</h2>
        <p>Price</p>
        <h3>{book.price}</h3>
        <p>Category</p>
        <h4>{book.category}</h4>
        <button onClick={() => addToCart(book)} className="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Bookdisplay;

