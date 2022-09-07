import { request } from "node:https";
import { storePersonsData, readPersonsData } from "./fsMethods.js";
import chalk from "chalk";

export function getPaginated(path = "person/popular", apiKey = "", page = 1) {
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

export function getOptions(path = "person/popular", apiKey = "") {
	return {
		href: "https://api.themoviedb.org/3/movie/550?api_key=816d07792301a398d9fdefa29b335f16",
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

export function getPersons(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
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
				readPersonsData(onSpinnerSuccess, onSpinnerError, notify);
			} else {
				onSpinnerSuccess("Popular Persons data loaded");
			}
		});
	});
	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});
	req.end();
}

const formatPerson = (data) => {   //*colors with Chalk at terminal.
	console.log(`Person:
    ID: ${data.id}
    Name: ${chalk.blue(data.name)}
    Birthday: ${chalk.magenta(data.birthday)} | ${data.place_of_birth}
    Department: ${chalk.magenta(data.known_for_department)}
    Biography: ${chalk.red(data.biography)}
    Also known as: 
    ${data.also_known_as[0]}
    `);
};

export function getPerson(
	id,
	// requestOptions,
	// onSpinnerSuccess,
	// onSpinnerError,
) {
	const options = {
		hostname: `api.themoviedb.org`,
		path: `/3/person/${id}?api_key=${process.env.API_KEY}&language=en-US`,
		method: "GET",
	};
	const req = request(options, function onResponse(res) {
		let responseBody = "";
		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});
		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			formatPerson(data); //se llama a una funcion que colorea lo que trae data con el chalk , //!formatPerson
			// onSpinnerSuccess("Person data loaded");
		});
	});
	req.on("error", function onError(err) {
		// onSpinnerError(err.message);
	});
	req.end();
}

export function getMovies(
	requestOptions,
	programOptions,
	onSpinnerSuccess,
	onSpinnerError,
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
					readPersonsData(onSpinnerSuccess, onSpinnerError, notify);
				} else {
					onSpinnerSuccess("Popular movies loaded");
				}
			} else if (programOptions.nowPlaying) {
				onSpinnerSuccess("Movies playing now loaded");
			} else if (!programOptions.nowPlaying && !programOptions.popular) {
				onSpinnerSuccess("Popular movies loaded");
			}
		});
	});
	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});
	req.end();
}

export function getMovie(requestOptions, onSpinnerSuccess, onSpinnerError) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";
		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});
		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			onSpinnerSuccess("Movie data loaded");
		});
	});
	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});
	req.end();
}

export function getMovieReviews(
	requestOptions,
	onSpinnerSuccess,
	onSpinnerError,
) {
	const req = request(requestOptions, function onResponse(res) {
		let responseBody = "";
		res.on("data", function onData(chunk) {
			responseBody += chunk;
		});
		res.on("end", function onEnd() {
			const data = JSON.parse(responseBody);
			onSpinnerSuccess("Movie reviews data loaded");
		});
	});
	req.on("error", function onError(err) {
		onSpinnerError(err.message);
	});
	req.end();
}
