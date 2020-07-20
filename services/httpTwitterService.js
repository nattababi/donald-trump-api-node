const config = require("config");
const axios = require("axios");

axios.defaults.baseURL = process.env.TWITTER_APP_API_URL || config.get("twitterApiUrl");
axios.defaults.headers['Authorization'] = 'Bearer ' + config.get("token");

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    //logger.log(error);
    //toast.error("An unexpected error occurrred.");
  }
  return Promise.reject(error);
});

module.exports = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
