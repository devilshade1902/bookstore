import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Aboutus from './pages/Aboutus/Aboutus';
import Contactus from './pages/contactus/Contactus';
import Footer from './components/Footer/Footer';
import All_books from './pages/all_books/All_books';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Bookinfo from './components/bookinfo/Bookinfo';
import Cart from './pages/cart/Cart';
import axios from 'axios';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:4000/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  // Function to add an item to the cart
  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book_id === book.book_id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.book_id === book.book_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (book_id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.book_id !== book_id));
  };

  // Function to increment quantity
  const incrementQuantity = (book_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.book_id === book_id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement quantity
  const decrementQuantity = (book_id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.book_id === book_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route
          path="/allbooks"
          element={
            <All_books />
          }
        />
        <Route
          path="/books/:book_id"
          element={
            <Bookinfo
              addToCart={addToCart}
              cartItems={cartItems}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          }
        />
        <Route path="contactus" element={<Contactus />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="signup" element={<Signup setUser={setUser} />} />
        <Route path="cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;