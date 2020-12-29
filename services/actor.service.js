require('dotenv').config();
const axios = require('../config/axiosConfig');

const getActorId = (actorName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const encodedActorName = encodeURIComponent(actorName);
      const { data } = await axios.get(`/search/person?query=${encodedActorName}&page=1`);
      const { results } = data;

      if (!results.length) throw new Error(`${actorName} is not exist`);
      resolve(results[0].id);
    } catch (err) {
      reject(err);
    }
  });
};

const getActorMoviesInfo = (actorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/person/${actorId}/movie_credits`);
      resolve(data.cast);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getActorId,
  getActorMoviesInfo
};
