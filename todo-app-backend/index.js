const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req,res) => {
    res.send('Express is running');
});

app.use('/api/tasks',require('./routes/tasks'));

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
});