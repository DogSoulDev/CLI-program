import dotenv from "dotenv";

dotenv.config();

export const API_PATH = {
  popularPersons: (page) =>
    `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  singlePerson: (id) => `/3/person/${id}?api_key=${process.env.API_KEY}`,
  popularMovies: (page) =>
    `/3/movie/popular?page=${page}&api_key=${process.env.API_KEY}`,
  nowPlayingMovies: (page) =>
    `/3/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`,
  singleMovie: (id) => `/3/movie/${id}?api_key=${process.env.API_KEY}`,
  singleMovieReviews: (id) =>
    `/3/movie/${id}/reviews?api_key=${process.env.API_KEY}`,
};

/**
 * It takes a method and a payload and returns an object with the hostname, port, path, and method.
 * @param method - the method you want to call
 * @param payload - Identifier for the API_PATH function object
 * @returns An object with the request properties
 */
export const getRequestOptions = (method, payload) => {
  return {
    hostname: "api.themoviedb.org",
    port: 443,
    path: API_PATH[method](payload),
    method: "GET",
  };
};
