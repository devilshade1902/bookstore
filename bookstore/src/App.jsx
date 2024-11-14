import React, { useState } from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter,Route,Routes, useParams} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Aboutus from './pages/Aboutus/Aboutus'
import Contactus from './pages/contactus/Contactus'
import Footer from './components/Footer/Footer'
import All_books from './pages/all_books/All_books'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Bookinfo from './components/bookinfo/Bookinfo'
import books from './assets/data'
import Cart from './pages/cart/Cart'

const App = () => {
  const {bookid} = useParams();
    const book = books.find((e)=>e.id === Number(bookid))
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addToCart = (book) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.book_id === book.book_id);
        if (existingItem) {
          // Increase quantity if the item already exists in the cart
          return prevItems.map((item) =>
            item.book_id === book.book_id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Add new item to the cart with a quantity of 1
          return [...prevItems, { ...book, quantity: 1 }];
        }
      });
    };
  
    // Function to remove an item from the cart
    const removeFromCart = (book_id) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.book_id !== book_id)
      );
    };
  
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='aboutus' element={<Aboutus/>}/>
    <Route path = '/allbooks' element={<All_books addToCart={addToCart}/>}/>
    <Route path='/books' element={<Bookinfo addToCart={addToCart}/>}>
    <Route path=':book_id' element={<Bookinfo/>}/>
    </Route>
    <Route path='contactus' element={<Contactus/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
    <Route path='cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart}/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}

export default App
