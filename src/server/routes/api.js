const router = require('express').Router();

const {encode} = require('../../utils/baseConvert');
const {Url} = require('../db/models');

const isUrl = require('is-url');

router.post('/shorten', (req, res) => {
  const {url} = req.body;

  if(!isUrl(url)) {
    return res.status(400).send('invalid url: ' + url);
  }

  // look up in db
  Url.findOne({longUrl: url}, (err, doc) => {
    if(doc) {
      // this alread exists
      const shortUrl = `http://localhost/${encode(doc.entityId)}`;
      return res.send({shortUrl});
    } else {
      const newUrl = Url({
        longUrl: url
      });
      newUrl.save()
        .then(result => {
          const shortUrl = `http://localhost/${encode(result.entityId)}`;
          return res.send({shortUrl});
        });
    }
  });
});

module.exports = router;