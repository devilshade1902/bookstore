import React from 'react'
import './Admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Addbook from '../../components/addbook/Addbook'
import List_book from '../../components/list_book/List_book'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addbook' element={<Addbook/>}/>
        <Route path='/books' element={<List_book/>}/>
      </Routes>
    </div>
  )
}

export default Admin
