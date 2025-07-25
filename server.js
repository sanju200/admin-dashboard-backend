const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

const DATA_BASE = "mongodb+srv://sanjivanibhongade:Kizora%401234@cluster0.aljb9az.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/dashboard";

//  Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Optional: Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

// Routes
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

app.use('/users', usersRoute);
app.use('/products', productsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
