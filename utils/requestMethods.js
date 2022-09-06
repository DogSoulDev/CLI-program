import { request } from "https";
import { storePersonsData, readPersonsData, storeMoviesData, readMoviesData } from "./fsMethods.js";

function getPaginatedRequestOptions(
	path = "person/popular",
	apiKey = "",
	page = 1,
) {
	return {
		href: "https://api.themoviedb.org/3/movie/550?api_key=816d07792301a398d9fdefa29b335f16",
		protocol: "https:",
		hostname: "api.themoviedb.org",
		path: `/3/${path}?page=${page}`,
		port: 443,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
	};
}

function getRequestOptions(path = "person/popular", apiKey = "") {
	return {
		href: "https://api.themoviedb.org",
		protocol: "https:",
		hostname: "api.themoviedb.org",
		path: `/3/${path}`,
		port: 443,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
	};
}

function getPersons(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
	renderData,
	notify,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";

		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});

		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);

			if (programOptions.save) {
				storePersonsData(data, onSpinnerSuccess, onSpinnerError, notify);
			} else if (programOptions.local) {
				readPersonsData(renderData, onSpinnerSuccess, onSpinnerError, notify);
			} else {
				renderData(data.page, data.total_pages, data.results);
				onSpinnerSuccess("Popular Persons data loaded");
			}
		});
	});

	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});

	req.end();
}

function getPerson(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
	renderData,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";

		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});

		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			renderData(data);
			onSpinnerSuccess("Person data loaded");
		});
	});

	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});

	req.end();
}

function getMovies(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
	renderData,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";

		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});

		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);

			if (programOptions.popular) {
				if (programOptions.save) {
					storePersonsData(data, onSpinnerSuccess, onSpinnerError, notify);
				} else if (programOptions.local) {
					readPersonsData(renderData, onSpinnerSuccess, onSpinnerError, notify);
				} else {
					renderData(data.page, data.total_pages, data.results);
					onSpinnerSuccess("Popular movies data loaded");
				}
			} else if (programOptions.nowPlaying) {
				onSpinnerSuccess("Movies playing now data loaded");
			} else if (!programOptions.nowPlaying && !programOptions.popular) {
				onSpinnerSuccess("Popular movies data loaded");
			}
		});
	});

	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});

	req.end();
}

function getMovie(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
	renderData,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";

		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});

		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			renderData(data);
			onSpinnerSuccess("Movie data loaded");
		});
	});

	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});

	req.end();
}

function getMovieReviews(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
	renderData,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";

		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});

		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			renderData(data.page, data.total_pages, data.results, requestOptions.id);
			onSpinnerSuccess("Movie reviews data loaded");
		});
	});

	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});

	req.end();
}

export const getPaginatedRequestOptions = getPaginatedRequestOptions;
export const getRequestOptions = getRequestOptions;
export const getPersons = getPersons;
export const getPerson = getPerson;
export const getMovies = getMovies;
export const getMovie = getMovie;
export const getMovieReviews = getMovieReviews;
