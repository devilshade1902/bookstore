const port = 4000;
const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

const JWT_SECRET = 'abcde'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

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


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Check if email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    sql.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ error: 'Server error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      sql.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ error: 'Error creating user' });
        }

        // Generate JWT
        const user = { id: result.insertId, name, email };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user });
      });
    });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  sql.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// User endpoint to fetch user data
app.get('/user', authenticateToken, (req, res) => {
  const query = 'SELECT id, name, email FROM users WHERE id = ?';
  sql.query(query, [req.user.id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: results[0] });
  });
});



app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port " +port);
    }
    else{
        console.log("error:"+error);
        
    }
})





