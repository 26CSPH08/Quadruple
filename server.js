const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Connect to MongoDB - Quadruple database
mongoose.connect('mongodb://localhost:27017/Quadruple')
  .then(() => console.log('MongoDB Connected - Quadruple'))
  .catch(err => console.log(err));

// User Schema - for users collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema, 'users');

// Book Schema - for Books collection
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number
});
const Book = mongoose.model('Book', bookSchema, 'Books');

// Register
app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'Registered successfully' });
});

// Login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  
  if (user) res.json({ success: true });
else res.json({ success: false });
});

// Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));