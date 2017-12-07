const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = Promise; // use ES6 Promises

const morgan = require('morgan');
const bodyParser = require('body-parser');

// routes
const apiRoutes = require('./routes/api');
const mainRoutes = require('./routes/main');
// server config
const port = process.env.PORT || 3000;
const PROD = process.env.NODE_ENV === 'prod';

// middleware
if(!PROD) {         
  app.use(morgan('dev')); // url logging
}

// parse req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure routes
const indexPath = path.join(__dirname, '../../build/index.html');

// tell Express to serve file from our public folder
app.use(express.static(path.join(__dirname, '../../build/')));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.use(mainRoutes);

// connect to db and then start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/url-shortener', {useMongoClient: true});
console.log('db connected');

app.listen(port, () => {
  console.log(`Server now running on port ${port}`);
});
