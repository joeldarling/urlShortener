const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
  entityId: { type: String },
  seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('counter', CounterSchema);

module.exports = Counter;
