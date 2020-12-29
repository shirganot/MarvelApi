const express = require('express');
const router = express.Router();

router.use('/actors', require('./actor.route'));
router.use('/movies', require('./movie.route'));

module.exports = router;
