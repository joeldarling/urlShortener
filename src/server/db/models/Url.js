const mongoose = require('mongoose');

const Counter = require('./Counter');

const urlSchema = mongoose.Schema({
  entityId: { type: Number, index: true },
  longUrl: String,
  createdAt: Date,
  expires: { type: Date, default: null },
  hits: { type: Number, default: 0 }
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  const doc = this;
  // find the url_count and increment it by 1
  Counter.findOneAndUpdate({entityId: 'urlCount'}, {$inc: {seq: 1}}, {new: true, upsert: true})
    .then(counter => {
      // set the _id of the urls collection to the incremented value of the counter
      doc.entityId = counter.seq;
      doc.created_at = new Date();
      next();
    })
    .catch(err =>{
      next(err);
    });
});
const Url = mongoose.model('url', urlSchema);

module.exports = Url;
