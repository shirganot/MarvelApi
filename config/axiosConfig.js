const axios = require('axios').default;
const {
  DEFAULT_MOVIE_DB_DOMAIN,
  DEFAULT_MOVIE_DB_LANGUAGE,
  DEFAULT_MOVIE_DB_API_KEY
} = require('../constants');

module.exports = axios.create({
  baseURL: process.env.MOVIE_DB_DOMAIN || DEFAULT_MOVIE_DB_DOMAIN,
  params: {
    api_key: process.env.MOVIE_DB_API_KEY || DEFAULT_MOVIE_DB_API_KEY,
    language: process.env.MOVIE_DB_LANGUAGE || DEFAULT_MOVIE_DB_LANGUAGE
  }
});
