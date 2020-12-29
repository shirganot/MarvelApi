const axios = require('axios').default;

module.exports = axios.create({
  baseURL: process.env.MOVIE_DB_DOMAIN,
  params: {
    api_key: process.env.MOVIE_DB_API_KEY,
    language: process.env.MOVIE_DB_LANGUAGE,
  },
});
