import { Command } from "commander";
import {
	createSpinner,
	spinnerHandlerOnError,
	spinnerHandlerOnSuccess,
} from "./utils/spinners/spinnersHandler.js";
import {
	renderPersonsData,
	renderPersonData,
	renderMoviesData,
	renderMovieData,
} from "./utils/renders/renders.js";
import { moviedbRequest } from "./services/moviedbRequest.js";
import { saveRequestData, readRequestData } from "./utils/fs/fsFunctions.js";

const program = new Command();

// Settings
program
	.name("movieDB CLI")
	.description("CLI to obtain information from movieDB API")
	.version("0.0.1");

//Set help setting
program.configureHelp({
	sortSubcommands: true,
	subcommandTerm: (cmd) => cmd.name(),
});

//Get persons command
program
	.command("get-persons")
	.description("Make a network request to fetch the most popular persons")
	.requiredOption("-p, --popular", "Fetch the popular persons")
	.requiredOption(
		"--page <number>",
		"The page of persons data results to fetch",
	)
	.option("-s, --save", "Store the data in the local file system.")
	.option("-l, --local", "Read the data from the local file system")
	.action((options) => {
		const { page, save, local } = options;
		const spinner = createSpinner("Fetching the popular person's data...");

		setTimeout(async () => {
			if (local) {
				try {
					const readData = await readRequestData(
						"popularPersons",
						`/popularPersons-page${page}.json`,
					);
					renderPersonsData(readData);
				} catch (error) {
					spinnerHandlerOnError(spinner, error.message);
				}
				spinner.stop();
				return;
			}

			try {
				const response = await moviedbRequest("popularPersons", page);
				if (save) {
					try {
						await saveRequestData(
							"popularPersons",
							`/popularPersons-page${page}.json`,
							response,
						);
						spinnerHandlerOnSuccess(spinner, "Popular persons data stored");
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
					spinner.stop();
					return;
				}
				renderPersonsData(response);
				spinnerHandlerOnSuccess(spinner, "Popular persons loaded");
			} catch (error) {
				spinnerHandlerOnError(spinner, error.message);
			}

			spinner.stop();
		}, 2000);
	});

//Get single person command
program
	.command("get-person")
	.description("Make a network to fetch the data of a single person")
	.requiredOption("-i, --id <number>", "Fetch the person with ID")
	.option("-s, --save", "Store the data in the local file system.")
	.option("-l, --local", "Read the data from the local file system")
	.action((options) => {
		const { id, save, local } = options;
		const spinner = createSpinner(
			`Fetching the person's data with id=${id} ...`,
		);

		setTimeout(async () => {
			if (local) {
				try {
					const readData = await readRequestData(
						"singlePerson",
						`/person-id${id}.json`,
					);
					renderPersonData(readData);
				} catch (error) {
					spinnerHandlerOnError(spinner, error.message);
				}
				spinner.stop();
				return;
			}

			try {
				const response = await moviedbRequest("singlePerson", id);
				if (save) {
					try {
						await saveRequestData(
							"singlePerson",
							`/person-id${id}.json`,
							response,
						);
						spinnerHandlerOnSuccess(spinner, "Person data stored");
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
					spinner.stop();
					return;
				}
				renderPersonData(response);
				spinnerHandlerOnSuccess(spinner, "Person data loaded");
			} catch (error) {
				spinnerHandlerOnError(spinner, error.message);
			}

			spinner.stop();
		}, 2000);
	});

//Get movies command
program
	.command("get-movies")
	.description("Make a network request to fetch movies")
	.requiredOption("--page <number>", "The page of movies data results to fetch")
	.option("-p, --popular", "Fetch the popular movies")
	.option("-n, --nowPlaying", "Fetch the movies that are playing now")
	.option("-s, --save", "Store the data in the local file system.")
	.option("-l, --local", "Read the data from the local file system")
	.action((options) => {
		const { page, nowPlaying, save, local } = options;
		const spinner = createSpinner("Fetching the movie's data...");
		setTimeout(async () => {
			if (local) {
				if (nowPlaying) {
					try {
						const readData = await readRequestData(
							"nowPlayingMovies",
							`/nowPlayingMovies-page${page}.json`,
						);
						renderMoviesData(readData);
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
				} else {
					try {
						const readData = await readRequestData(
							"popularMovies",
							`/popularMovies-page${page}.json`,
						);
						renderMoviesData(readData);
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
				}
				spinner.stop();
				return;
			}

			if (nowPlaying) {
				try {
					const response = await moviedbRequest("nowPlayingMovies", page);
					if (save) {
						try {
							await saveRequestData(
								"nowPlayingMovies",
								`/nowPlayingMovies-page${page}.json`,
								response,
							);
							spinnerHandlerOnSuccess(
								spinner,
								"Movies now playing data stored",
							);
						} catch (error) {
							spinnerHandlerOnError(spinner, error.message);
						}
						spinner.stop();
						return;
					}
					renderMoviesData(response);
					spinnerHandlerOnSuccess(spinner, "Movies now playing data loaded");
				} catch (error) {
					spinnerHandlerOnError(spinner, error.message);
				}
				spinner.stop();
				return;
			}

			try {
				const response = await moviedbRequest("popularMovies", page);
				if (save) {
					try {
						await saveRequestData(
							"popularMovies",
							`/popularMovies-page${page}.json`,
							response,
						);
						spinnerHandlerOnSuccess(spinner, "Popular movies data stored");
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
					spinner.stop();
					return;
				}
				renderMoviesData(response);
				spinnerHandlerOnSuccess(spinner, "Popular movies loaded");
			} catch (error) {
				spinnerHandlerOnError(spinner, error.message);
			}
			spinner.stop();
		}, 2000);
	});

//Get single movie command
program
	.command("get-movie")
	.description("Make a network request to fetch the data of a single movie")
	.requiredOption("-i, --id <number>", "The id of the movie")
	.option("-r, --reviews", "Fetch the reviews of the movie")
	.option("-s, --save", "Store the data in the local file system.")
	.option("-l, --local", "Read the data from the local file system")
	.action((options) => {
		const { id, reviews, save, local } = options;
		const spinner = createSpinner(
			`Fetching the movies's data with id=${id} ...`,
		);

		setTimeout(async () => {
			if (local) {
				if (reviews) {
					try {
						const readData = await readRequestData(
							"singleMovieReviews",
							`/movieReview-id${id}.json`,
						);
						//renderReview
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
				} else {
					try {
						const readData = await readRequestData(
							"singleMovie",
							`/movie-id${id}.json`,
						);
						renderMovieData(readData);
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
				}
				spinner.stop();
				return;
			}

			if (reviews) {
				try {
					const response = await moviedbRequest("singleMovieReviews", id);
					if (save) {
						try {
							await saveRequestData(
								"singleMovieReviews",
								`/movieReview-id${id}.json`,
								response,
							);
							spinnerHandlerOnSuccess(spinner, "Movie reviews data stored");
						} catch (error) {
							spinnerHandlerOnError(spinner, error.message);
						}
						spinner.stop();
						return;
					}
					//render reviews
					spinnerHandlerOnSuccess(spinner, "Movie reviews data loaded");
				} catch (error) {
					spinnerHandlerOnError(spinner, error.message);
				}
				spinner.stop();
				return;
			}

			try {
				const response = await moviedbRequest("singleMovie", id);
				if (save) {
					try {
						await saveRequestData(
							"singleMovie",
							`/movie-id${id}.json`,
							response,
						);
						spinnerHandlerOnSuccess(spinner, "Movie data stored");
					} catch (error) {
						spinnerHandlerOnError(spinner, error.message);
					}
					spinner.stop();
					return;
				}
				renderMovieData(response);
				spinnerHandlerOnSuccess(spinner, "Movie data loaded");
			} catch (error) {
				spinnerHandlerOnError(spinner, error.message);
			}
			spinner.stop();
		}, 2000);
	});

program.parse(process.argv);
