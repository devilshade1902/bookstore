import React, { useEffect, useState } from 'react'
import './Trending.css'
import Book from '../Book/Book'


const Trending = () => {

  const [trending,setTrending] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/trending')
    .then((response)=>response.json())
    .then((data)=>setTrending(data))
  },[])

  return (
    <div className='trending'>
        <h3>Trending Books</h3>
        <div className="book-items">
        {trending.slice(1,7).map((item,i)=>{
            return <Book key={item.book_id} book_id={item.book_id} name={item.title} category={item.category} price={item.price} image={item.image_url}/>
        })}
        </div>
        
    </div>
  )
}

export default Trending
