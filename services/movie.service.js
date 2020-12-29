require('dotenv').config();
const axios = require('../config/axiosConfig');

const getMovieCast = (movieId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`/movie/${movieId}/credits`);
      const {
        data: { cast }
      } = res;

      resolve(cast);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getMovieCast
};
