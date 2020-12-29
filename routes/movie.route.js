const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/moreThenOneCharacter', async (req, res, next) => {
  try {
    const actors = await movieController.getActorsWhoPlayedMultipuleCharacters();
    res.json(actors);
  } catch (err) {
    next(err);
  }
});

router.get('/playedTheSameRole', async (req, res, next) => {
  try {
    const actors = await movieController.getActorsWhoPlayedTheSameRole();
    res.json(actors);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
