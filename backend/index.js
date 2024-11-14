const port = 4000;
const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const jwt = require('jsonwebtoken')
const multer = require("multer");
const path = require("path");
const cors = require("cors");


app.use(cors()); 

const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password : 'Dhruvtiger@1708',
    database : 'bookstore'
})


sql.connect((err)=>{
    if(err){
        console.error('error connecting to the database',err);
        return;
    }
    console.log('connected to the database');
    
})

app.get("/",(req,res)=>{
    res.send("Express app is running")
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('book'),(req,res)=>{
    res.json({
        success:1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.post('/addbook',async (req,res)=>{
    const {title,category,price,stock,image_url} = req.body
    // console.log(req.body)

    if(!title || !category || !price || !stock || !image_url){
        return res.status(400).json({error:'please provide all required fields. '})
    }

    const query = 'insert into books(title,category,price,stock,image_url) values(?, ?, ?, ?, ?)'
    const values = [title,category,price,stock,image_url];

    sql.query(query,values,(err,result)=> {
        if(err){
            console.error('Error inserting book: ', err);
            return res.status(500).json({success:false,error:'Error inserting book'})
        }
        res.status(201).json({success:true,message:'Book added successfully ', bookid:result.insertId})
    })
})


app.delete('/deletebook/books/:book_id',async(req,res)=> {
    const {book_id}= req.params;

    if(!book_id){
        return res.status(400).json({error:'Book ID is required'})
    }

    const query = 'delete from books where book_id = ?';

    sql.query(query,[book_id],(err,results)=>{
        if(err){
            console.error('Error deleting bookL ', err);
            return res.status(500).json({error: 'Error deleting book'})            
        }

        if(results.affectedRows === 0){
            return res.status(404).json({message: 'book not found'})
        }
        res.status(200).json({message: 'Book deleted successfully'})
    })
})



app.get('/books/:book_id', (req, res) => {
    const { book_id } = req.params;
    const query = 'SELECT * FROM books WHERE book_id = ?';
    
    sql.query(query, [book_id], (err, results) => {
        if (err) {
            console.error('Error fetching book:', err);
            return res.status(500).json({ error: 'Error fetching book' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(results[0]); 
    });
});

app.get('/books',(req,res)=>{
    const books = 'select * from books';
    sql.query(books,(err, results,fields) => {
        if(err){
            res.send('error executing query: ',err);
            return;
        }
        res.status(200).send(results)
        
    })
})

app.get('/trending',async (req,res)=>{
    const books = 'select * from books';
    sql.query(books,(err, results) => {
        if(err){
            res.send('error executing query: ',err);
            return;
        }
        res.status(200).send(results)
        
    })
})






















app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port " +port);
    }
    else{
        console.log("error:"+error);
        
    }
})





