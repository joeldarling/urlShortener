const mongoose = require('mongoose');

const models = './models';

/// SETUP MONGOOSE CONNECTION ///
let _conn;

const connect = function(){
  if(_conn)
    return _conn;

  _conn = mongoose.createConnection(process.env.CONN || 'mongodb://localhost/url-shortener', {useMongoClient: true});
  return _conn;
};

const disconnect = function(){
  if(!_conn)
    return;

  mongoose.connection.close();
};


/// EXPORT MODULE ///
module.exports = {
  connect,
  disconnect,
  models
};