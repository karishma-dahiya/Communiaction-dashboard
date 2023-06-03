const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { User ,Order } = require('./models/schema');


const app = express();

const routes = require('./routes/api');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();




app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
