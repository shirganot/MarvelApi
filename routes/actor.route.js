const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');

router.get('/:actorName/movies', async (req, res, next) => {
  try {
    const { actorName } = req.params;
    const actorsMovies = await actorController.getActorMovies(actorName);
    res.json(actorsMovies);
  } catch (err) {
    next(err);
  }
});

router.get('/movies', async (req, res, next) => {
  try {
    const actorsMovies = await actorController.getAllActorsMovies();
    res.json(actorsMovies);
  } catch (err) {
    next(err);
  }
});

router.get('/moreThanOneCharacter', async (req, res, next) => {
  try {
    const actors = await actorController.getActorsWhoPlayedMultipuleCharacters();
    res.json(actors);
  } catch (err) {
    next(err);
  }
});

router.get('/playedTheSameRole', async (req, res, next) => {
  try {
    const actors = await actorController.getActorsWhoPlayedTheSameRole();
    res.json(actors);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
