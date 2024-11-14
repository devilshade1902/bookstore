import React, { useState } from 'react'
import './addbook.css'
import addphoto from '../../assets/add-photo.png'

const Addbook = () => {

    const [image, setImage] = useState(false)
    const [productdetails, setProductdetails] = useState({
        title:"",
        category:"",
        image:"",
        price:"",
        stock:""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductdetails({...productdetails,[e.target.name]:e.target.value})
    }

    const add_book = async ()=>{
        let responseData;
        let book = productdetails

        let formData = new FormData();
        formData.append('book',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if (responseData.success)
        {
            book.image_url = responseData.image_url;
            console.log(book)
            await fetch('http://localhost:4000/addbook',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(book),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success ? alert("Book Added") : alert("Failed")
            })

        }else{
            alert("image upload failed")
        }
    }



  return (
    <div className='add-book'>
        <div className="add-book-itemfield">
            <p>Book Title</p>
            <input value={productdetails.title} onChange={changeHandler} type="text" name="title" placeholder='Type Here' />
        </div>
        <div className="add-book-price">
            <div className="add-book-itemfield">
                <p>price</p>
                <input value={productdetails.price} onChange={changeHandler} type="text" name="price" placeholder='Type Here' />
            </div>
        </div>
        <div className="add-book-itemfield">
            <p>Category</p>
            <input value={productdetails.category} onChange={changeHandler} type="text" name='category' placeholder='Type Here' />
        </div>
        <div className="add-book-itemfield">
            <p>stock</p>
            <input value={productdetails.stock} onChange={changeHandler} type="text" name='stock' placeholder='Type Here' />
        </div>
        <div className="add-book-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):addphoto} alt="" style={{width:"100px",marginTop:'30px'}}  className='add-photo-thumbnail'/>
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input"  hidden />
        </div>
        <button onClick={()=>{add_book()}} className='add-book-btn'>ADD</button>
    </div>
  )
}

export default Addbook
