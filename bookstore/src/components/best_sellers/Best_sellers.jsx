import React, { useEffect, useState } from 'react'
import './Best_sellers.css'
import books from '../../assets/data'
import Book from '../Book/Book'

const Best_sellers = () => {
  const [best_sellers, setBestsellers] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/books')
    .then((response)=>response.json())
    .then((data)=>setBestsellers(data))
  })

  return (
    <div className='best-sellers'>
      <h3>Best Sellers</h3>
      <div className="book-items">
        {best_sellers.slice(3,6).map((item,i)=>{
            return <Book key={i} book_id={item.book_id} name ={item.title} category = {item.category} price={item.price} image = {item.image_url}/>
        })}
      </div>
    </div>
  )
}

export default Best_sellers
