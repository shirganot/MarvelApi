const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json('insideee');
});

router.get('/:actorName/movies', function (req, res, next) {
  res.json('insideee complex');
});

module.exports = router;
