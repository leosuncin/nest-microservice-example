import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = globalThis.__BASE_URL__;
};
