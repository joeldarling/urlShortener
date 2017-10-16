const app = require('express')();
const morgran = require('morgan');
const bodyParser = require('body-parser');

// routes
const apiRoutes = require('./routes/api');

// server config
const port = process.env.port || 3000;
const PROD = process.env.NODE_ENV === 'prod';

// middleware
if(!PROD) {
  app.use(morgran('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('main page')
})

app.listen(port, () => {
  console.log(`Server now running on port ${port}`);
})