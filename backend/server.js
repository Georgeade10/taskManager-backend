const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/connectDB.js');
const mongoose = require('mongoose');
const Task = require('./model/taskModel.js');
const taskRoutes = require('./routes/taskRoute.js');
const cors = require('cors');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://task-manager-fullstack.onrender.com',
    ],
  })
);
app.use('/api/tasks', taskRoutes);

// Creating Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
