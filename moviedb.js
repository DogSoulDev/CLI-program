import { Command } from "commander";
import { config } from "dotenv";
import ora from "ora";

config();

const program = new Command();
program.version("");

import { getPaginated, getOptions, getPersons, getPerson, getMovies, getMovie, getMovieReviews } from './utils/requestMethods.js';
import { renderPersonsData, renderPersonData, renderMoviesData, renderMovieData, renderMovieReviewsData } from './utils/renderMethods.js';
import { createSpinnerSuccessHandler, createSpinnerErrorHandler } from './utils/createSpinnerHandlers.js';
import { notify } from './utils/notifiers.js';

program
	.command("get-persons")
	.description("Make a network request to fetch most popular persons")
	.requiredOption("-p, --popular", "Fetch the popular persons")
	.requiredOption(
		"--page <number>",
		"The page of persons data results to fetch",
	)
	.option("-s, --save", "Store the data in the filesystem")
	.option("-l, --local", "Load the data from the filesystem first")
	.action(function handleAction(programOptions) {
		const spinner = ora("Fetching the popular persons data...").start();
		let requestPath = `person/`;

		if (programOptions.popular) {
			requestPath += "popular";
		}

		const requestOptions = getOptions(
			requestPath,
			process.env.API_KEY,
			programOptions.page,
		);

		return getPersons(
			requestOptions,
			programOptions,
			createSpinnerSuccessHandler(spinner),
			createSpinnerErrorHandler(spinner),
			renderPersonsData,
			notify,
		);
	});

program
	.command("get-person")
	.description("Make a network request to fetch the data of a single person")
	.requiredOption("-i, --id <personID>", "The id of the person")
	.option("-s, --save", "Store the data in the filesystem")
	.option("-l, --local", "Load the data from the filesystem first")
	.action(function handleAction(programOptions) {
		const spinner = ora("Fetching the person data...").start();

		const requestOptions = getPaginated(
			`person/${programOptions.id}`,
			process.env.API_KEY,
		);

		return getPerson(
			requestOptions,
			programOptions,
			createSpinnerSuccessHandler(spinner),
			createSpinnerErrorHandler(spinner),
			renderPersonData,
		);
	});

program
	.command("get-movies")
	.description("Make a network request to fetch movies")
	.requiredOption("--page <number>", "The page of movies data results to fetch")
	.option("-p, --popular", "Fetch the popular movies", false)
	.option("-n, --now-playing", "Fetch the movies that are playing now", false)
	.option("-s, --save", "Store the data in the filesystem")
	.option("-l, --local", "Load the data from the filesystem first")
	.action(function handleAction(programOptions) {
		const spinner = ora("Fetching the movies data...").start();

		let requestPath = "movie/";

		if (programOptions.popular) {
			requestPath += "popular";
		} else if (programOptions.nowPlaying) {
			requestPath += "now_playing";
		} else if (!programOptions.nowPlaying && !programOptions.popular) {
			requestPath += "popular";
		}

		const requestOptions = getOptions(
			requestPath,
			process.env.API_KEY,
			programOptions.page,
		);

		return getMovies(
			requestOptions,
			programOptions,
			createSpinnerSuccessHandler(spinner),
			createSpinnerErrorHandler(spinner),
			renderMoviesData,
		);
	});

program
	.command("get-movie")
	.description("Make a network request to fetch the data of a single person")
	.requiredOption("-i, --id <movieID>", "The id of the movie")
	.option("-r, --reviews", "Fetch the reviews of the movie")
	.option("-s, --save", "Store the data in the filesystem")
	.option("-l, --local", "Load the data from the filesystem first")
	.action(function handleAction(programOptions) {
		const spinner = ora("Fetching the movie data...").start();

		let requestPath = `movie/${programOptions.id}`;

		if (programOptions.reviews) {
			requestPath += `/reviews`;

			const requestOptions = getPaginated(
				requestPath,
				process.env.API_KEY,
			);

			return getMovieReviews(
				requestOptions,
				programOptions,
				createSpinnerSuccessHandler(spinner),
				createSpinnerErrorHandler(spinner),
				renderMovieReviewsData,
			);
		}

		const requestOptions = getPaginated(requestPath, process.env.API_KEY);

		return getMovie(
			requestOptions,
			programOptions,
			createSpinnerSuccessHandler(spinner),
			createSpinnerErrorHandler(spinner),
			renderMovieData,
		);
	});

// error on unknown commands
program.on("command:*", function () {
	console.error(
		"Invalid command: %s\nSee --help for a list of available commands.",
		program.args.join(" "),
	);
	process.exit(1);
});

program.parse(process.argv);
