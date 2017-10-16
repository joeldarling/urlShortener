const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = Promise; // use ES6 Promises

const morgran = require('morgan');
const bodyParser = require('body-parser');

// routes
const apiRoutes = require('./routes/api');
const mainRoutes = require('./routes/main');
// server config
const port = process.env.port || 3000;
const PROD = process.env.NODE_ENV === 'prod';

// middleware
if(!PROD) {         
  app.use(morgran('dev')); // url logging
}

// parse req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure routes

// tell Express to serve file from our public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);
app.use(mainRoutes);

app.get('/', (req, res) => {
  res.send('main page');
});

// connect to db and then start server
mongoose.connect(process.env.DB_URL || 'mongodb://localhost/url-shortener', {useMongoClient: true});
console.log('db conencted');

app.listen(port, () => {
  console.log(`Server now running on port ${port}`);
});

