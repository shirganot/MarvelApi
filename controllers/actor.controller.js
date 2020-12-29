const { compareTwoStrings } = require('string-similarity');
const actorService = require('../services/actor.service');

const actorsList = require('../data/actorsList');
const moviesList = require('../data/moviesList');
const moviesListIds = Object.values(moviesList);

const getAllActorsMovies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const actorsMovies = {};

      for (let actorName of actorsList) {
        const actorId = await actorService.getActorId(actorName);
        const actorMoviesInfo = await actorService.getActorMoviesInfo(actorId);

        const actorMarvelMovies = actorMoviesInfo.reduce((acc, currVal) => {
          const { id: movieId, original_title: movieName } = currVal;
          if (moviesListIds.includes(movieId)) {
            acc.push({
              name: movieName,
              id: movieId,
            });
          }
          return acc;
        }, []);

        actorsMovies[actorName] = actorMarvelMovies;
      }
      resolve(actorsMovies);
    } catch (err) {
      reject(err);
    }
  });
};

const getActorsWhoPlayedMultipuleCharacters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //actors characters object
      const aco = {};

      for (let actorName of actorsList) {
        const actorId = await actorService.getActorId(actorName);
        const actorMoviesInfo = await actorService.getActorMoviesInfo(actorId);

        const marvelOnly = actorMoviesInfo.filter(({ id }) => moviesListIds.includes(id));

        for (let castMember of marvelOnly) {
          const { character: newCharacter } = castMember;

          if (aco[actorId]) {
            const characterExist = aco[actorId].characters.some(
              (characterName) => compareTwoStrings(characterName, newCharacter) > 0.6,
            );
            if (!characterExist) aco[actorId].characters.push(newCharacter);
          } else {
            aco[actorId] = {
              name: actorName,
              characters: [newCharacter],
            };
          }
        }
      }

      const filteredArr = Object.values(aco)
        .filter(({ characters }) => characters.length > 1)
        .map(({ name, characters }) => [name, characters]);
      const actorsWithMultipuleCharacters = Object.fromEntries(filteredArr);

      resolve(actorsWithMultipuleCharacters);
    } catch (err) {
      reject(err);
    }
  });
};

const getActorsWhoPlayedTheSameRole = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // characters actors object
      const cao = {};

      for (let actorName of actorsList) {
        const actorId = await actorService.getActorId(actorName);
        const actorMoviesInfo = await actorService.getActorMoviesInfo(actorId);

        const marvelOnly = actorMoviesInfo.filter(({ id }) => moviesListIds.includes(id));

        for (let castMember of marvelOnly) {
          const { character: newCharacter } = castMember;

          const similarProperty = Object.keys(cao).find(
            (key) => compareTwoStrings(key, newCharacter) > 0.7,
          );

          if (similarProperty) {
            const actorExist = cao[similarProperty].some(
              ({ id: existActorId }) => existActorId === actorId,
            );
            if (!actorExist) cao[similarProperty].push({ name: actorName, id: actorId });
          } else cao[newCharacter] = [{ name: actorName, id: actorId }];
        }
      }

      const filteredArr = Object.entries(cao).filter(([, actorsArr]) => actorsArr.length > 1);
      const actorsWhoPlayTheSameRole = Object.fromEntries(filteredArr);

      resolve(actorsWhoPlayTheSameRole);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getAllActorsMovies,
  getActorsWhoPlayedMultipuleCharacters,
  getActorsWhoPlayedTheSameRole,
};
