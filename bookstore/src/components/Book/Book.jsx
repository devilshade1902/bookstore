import React from 'react';
import './Book.css';
import { Link } from 'react-router-dom';

const Book = (props) => {
  return (
    <div className="book">
      <Link to={`/books/${props.book_id}`}>
        <div>
          <img src={props.image} alt={props.name} />
        </div>
        <div className="book-name">
          <p style={{textDecoration:'none'}}>{props.name}</p>
        </div>
        <div className="book-details">
          <div className="book-price">
            <p>₹{props.price}</p>
          </div>
          <div className="book-cat">
            <p>{props.category}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Book;
