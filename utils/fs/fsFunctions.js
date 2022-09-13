import fs from "fs";
import path from "path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const notifier = require("node-notifier");

//Variables paths files system
const BASENAME = path.resolve("files");
const FOLDER_PATH = {
  popularMovies: "movies/PopularMovies",
  nowPlayingMovies: "movies/NowPlayingMovies",
  singleMovie: "movies/SingleMovies",
  singleMovieReviews: "movies/SingleMoviesReviews",
  popularPersons: "persons/PopularPersons",
  singlePerson: "persons/SinglePersons",
};

/**
 * It takes a command, a filename, and some data, and saves the data to a file
 * @param command - the command that was used to make the request
 * @param filename - "test.json"
 * @param data - {
 * @returns A promise that resolves to an object with a property of ok with a value of true.
 */
export const saveRequestData = (command, filename, data) => {
  const FILE_PATH = path.join(BASENAME, FOLDER_PATH[command], filename);

  return new Promise((resolve, reject) => {
    fs.writeFile(
      FILE_PATH,
      JSON.stringify(data, null, 4),
      "utf-8",
      (readErr) => {
        if (readErr) {
          reject(new Error(readErr));
          return;
        }
        resolve({ ok: true });
      }
    );
  });
};

/**
 * It reads a file from a folder, parses the data, and returns a promise
 * @param command - the command that the user is requesting
 * @param filename - the name of the file to be read
 * @param data - {
 * @returns A promise that resolves to the data read from the file.
 */
export const readRequestData = (command, filename, data) => {
  const FILE_PATH = path.join(BASENAME, FOLDER_PATH[command], filename);

  return new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, "utf-8", (readErr, data) => {
      if (readErr) {
        reject(new Error(readErr));
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};
