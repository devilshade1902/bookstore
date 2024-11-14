import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addbook from '../../assets/add-book.png'
import booklist from '../../assets/list-books.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
    <Link to={'/addbook'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={addbook} alt="" style={{width:'50px'}}/>
            <p>Add Book</p>
        </div>
    </Link>
    <Link to={'/books'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={booklist} alt="" style={{width:'50px'}} />
            <p>Books List</p>
        </div>
    </Link>
    </div>
  )
}

export default Sidebar
