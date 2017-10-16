const router = require('express').Router();

const {encode, decode} = require('../../utils/baseConvert');
const isUrl = require('is-url');

let global_id = 1;

const db = new Map();

router.post('/shorten', (req, res) => {
  const {url} = req.body;
  if(!isUrl(url)) {
    return res.send('bad request: ' + url);
  }
  const shortened = `http://localhost:3000/${encode(global_id)}`;
  db.set(global_id, url);
  console.log(db)
  global_id++;
  res.json({shortened});
})

module.exports = router;