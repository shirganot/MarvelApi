const { compareTwoStrings } = require('string-similarity');

const movieService = require('../services/movie.service');
const moviesList = require('../data/moviesList');
const moviesListIds = Object.values(moviesList);

const getActorsWhoPlayedMultipuleCharacters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //actors characters object
      const aco = {};

      for (let movieId of moviesListIds) {
        const movieCast = await movieService.getMovieCast(movieId);

        for (let castMember of movieCast) {
          const { id: actorId, character: newCharacter, name } = castMember;

          if (aco[actorId]) {
            const characterExist = aco[actorId].characters.some(
              (characterName) => compareTwoStrings(characterName, newCharacter) > 0.6
            );
            if (!characterExist) aco[actorId].characters.push(newCharacter);
          } else if (!aco[actorId]) {
            aco[actorId] = {
              name,
              characters: [newCharacter]
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

      for (let movieId of moviesListIds) {
        const movieCast = await movieService.getMovieCast(movieId);

        for (let castMember of movieCast) {
          const { id: actorId, character: newCharacter, name } = castMember;

          const similarProperty = Object.keys(cao).find(
            (key) => compareTwoStrings(key, newCharacter) > 0.7
          );

          if (similarProperty) {
            const actorExist = cao[similarProperty].some(
              ({ id: existActorId }) => existActorId === actorId
            );
            if (!actorExist) cao[similarProperty].push({ name, id: actorId });
          } else cao[newCharacter] = [{ name, id: actorId }];
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
  getActorsWhoPlayedMultipuleCharacters,
  getActorsWhoPlayedTheSameRole
};
