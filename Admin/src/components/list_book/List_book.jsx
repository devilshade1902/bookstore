import React, { useEffect, useState } from 'react'
import './Listbook.css'
import cross_icon from '../../assets/cross_icon.png'

const List_book = () => {

  const [allbooks,setAllbooks] = useState([])

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/books').then((res)=>res.json())
    .then((data)=>{setAllbooks(data)})
  }

  useEffect(()=>{
    fetchInfo();
  },[])


  const remove_book = async (book_id)=>{
    await fetch(`http://localhost:4000/deletebook/books/${book_id}`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({book_id:book_id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-book'>
      <h1>All Books</h1>
      <div className="list-book-format-main">
        <p>Books</p>
        <p>Title</p>
        <p>Price</p>
        <p>Stock</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-book-allbooks">
        <hr />
        {allbooks.map((book,index)=>{
          return <><div key={index} className="list-book-format-main list-book-format">
            <img src={book.image_url} alt="" className="list-book-icon" />
            <p>{book.title}</p>
            <p>₹{book.price}</p>
            <p style={{position:'relative',left:'20px'}}>{book.stock}</p>
            <p style={{position:'relative',left:'30px'}}>{book.category}</p>
            <img onClick={()=>{remove_book(book.book_id)}} className='list-book-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default List_book
