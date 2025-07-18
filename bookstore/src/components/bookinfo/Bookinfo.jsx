import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Bookdisplay from '../bookdisplay/Bookdisplay';

const Bookinfo = ({ addToCart, cartItems, incrementQuantity, decrementQuantity }) => {
  const { book_id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:4000/books/${book_id}`);
      const data = await response.json();
      setBook(data);
    };
    fetchBook();
  }, [book_id]);

  if (!book) {
    return <div>Error in loading the book</div>;
  }

  return (
    <div>
      <Bookdisplay
        book={book}
        addToCart={addToCart}
        cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  );
};

export default Bookinfo;