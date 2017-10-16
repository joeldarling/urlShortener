const router = require('express').Router();

const {decode} = require('../../utils/baseConvert');
const {Url} = require('../db/models');

router.get('/:encodedId', (req, res) => {
  const entityId = decode(req.params.encodedId);

  // check if url already exists in database
  Url.findOneAndUpdate({entityId}, {$inc: {hits: 1}}, (err, doc) => {
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      res.redirect(doc.longUrl);
    } else {
      // nothing found, take 'em home
      res.redirect('/');
    }
  });
});

router.get('/:encodedId/stats', (req, res) => {
  const entityId = decode(req.params.encodedId);

  // check if url already exists in database
  Url.findOne({entityId}, (err, doc) => {
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      const {longUrl, hits, createdAt} = doc;
      console.log(doc);
      
      res.send({longUrl, hits, createdAt});
    } else {
      // nothing found, take 'em home
      res.redirect('/');
    }
  });
});

module.exports = router;