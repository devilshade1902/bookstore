import React, { useEffect, useState } from 'react'
import books from '../../assets/data'
import Book from '../../components/Book/Book'
import './all-books.css'

const All_books = () => {
  const [all_books,setAllbooks] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/books')
    .then((response)=>response.json())
    .then((data)=>setAllbooks(data))
  })
  return (
    <div className='all-books'>
      <h3>All Books</h3>
      <div className='book-items'>
        {all_books.map((item,i)=>{
            return <Book key={i} book_id={item.book_id} name = {item.title} category = {item.category} price={item.price} image ={item.image_url}/>
        })}
      </div>
    </div>
  )
}

export default All_books
