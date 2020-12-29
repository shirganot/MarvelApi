const { StringUtils } = require('turbocommons-ts');

const movieService = require('../services/movie.service');
const moviesList = require('../data/moviesList');

const getActorsWhoPlayedMultipuleCharacters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const moviesListIds = Object.values(moviesList);
      //actors characters object
      const aco = {};

      for (let movieId of moviesListIds) {
        const movieCast = await movieService.getMovieCast(movieId);

        for (let castMember of movieCast) {
          const { id: actorId, character: newCharacter, name } = castMember;

          if (aco[actorId]) {
            const similar = aco[actorId].characters.some(
              (characterName) =>
                StringUtils.compareSimilarityPercent(characterName, newCharacter) > 40,
            );
            if (!similar) aco[actorId].characters.push(newCharacter);
          } else if (!aco[actorId]) {
            aco[actorId] = {
              name,
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
  getActorsWhoPlayedMultipuleCharacters,
};
