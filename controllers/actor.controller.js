const { StringUtils } = require('turbocommons-ts');
const actorService = require('../services/actor.service');

const actorsList = require('../data/actorsList');
const moviesList = require('../data/moviesList');

const getAllActorsMovies = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const actorsMovies = {};

      for (let actorName of actorsList) {
        const actorId = await actorService.getActorId(actorName);
        const actorMoviesInfo = await actorService.getActorMoviesInfo(actorId);

        const moviesListIds = Object.values(moviesList);

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
      let aco = {};
      const moviesListArr = Object.values(moviesList);

      for (let actorName of actorsList) {
        const actorId = await actorService.getActorId(actorName);
        const actorMoviesInfo = await actorService.getActorMoviesInfo(actorId);

        const marvelOnly = actorMoviesInfo.filter(({ id }) => moviesListArr.includes(id));

        for (let castMember of marvelOnly) {
          const { character: newCharacter } = castMember;

          if (aco[actorId]) {
            const similar = aco[actorId].characters.some(
              (characterName) =>
                // Check the similary percentage between the new character name and the previous recorded.
                StringUtils.compareSimilarityPercent(characterName, newCharacter) > 60,
            );
            if (!similar) {
              aco[actorId].characters.push(newCharacter);
            }
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

module.exports = {
  getAllActorsMovies,
  getActorsWhoPlayedMultipuleCharacters,
};
