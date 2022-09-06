import { mkdirSync, writeFile, readFile } from "fs";
import { resolve, join } from "path";

export function ensureDirSync(pathname) {
	const SRC_PATH = resolve("src");
	const FILES_PATH = join(SRC_PATH, "files");
	const DIR_PATH = join(FILES_PATH, pathname);

	// https://stackoverflow.com/questions/13696148/node-js-create-folder-or-use-existing
	try {
		mkdirSync(DIR_PATH, { recursive: true });

		return DIR_PATH;
	} catch (err) {
		// we could be dealing with something
		// like an EPERM or EACCES
		if (err.code !== "EXIST") throw err;
	}
}

export function saveLocalFile(filename, data, onSuccess, onFail) {
	writeFile(filename, data, "utf8", function handleWriteFile(err) {
		if (err) {
			onFail(err.message);
		}

		onSuccess("File was successfully stored in the local system");
	});
}

export function readLocalFile(filename, cb) {
	readFile(filename, "utf8", function handleWriteFile(err, data) {
		if (err) {
			return cb(err, null);
		}

		cb(null, data);
	});
}

export function storePersonsData(data, onSuccess, onFail, notify) {
	try {
		const personsPath = ensureDirSync("persons");
		const personsPathJSONFile = join(personsPath, "popular.json");

		saveLocalFile(personsPathJSONFile, JSON.stringify(data), onSuccess, onFail);
		notify("Persons data", "The data has been stored in the local filesystem!");
	} catch (error) {
		onFail(error.message);
		notify(
			"Persons data",
			"Something went wrong while storing the data in the filesystem",
		);
	}
}

export function readPersonsData(renderData, onSuccess, onFail, notify) {
	try {
		const personsPath = ensureDirSync("persons");
		const personsPathJSONFile = join(personsPath, "popular.json");

		readLocalFile(personsPathJSONFile, function handleFileRead(err, jsonData) {
			if (err) {
				notify(
					"Persons data",
					"Something went wrong while loading the data from the filesystem",
				);
				return onFail(err.message);
			}

			const data = JSON.parse(jsonData);

			renderData(data.page, data.total_pages, data.results);
			onSuccess("Popular Persons data loaded");
			notify(
				"Persons data",
				"The data has been loaded from the local filesystem!",
			);
		});
	} catch (error) {
		onFail(error.message);
	}
}

export function storeMoviesData(data, onSuccess, onFail, notify) {
	try {
		const moviesPath = ensureDirSync("movies");
		const moviesPathJSONFile = join(moviesPath, "popular.json");

		saveLocalFile(moviesPathJSONFile, JSON.stringify(data), onSuccess, onFail);
		notify("Movies data", "The data has been stored in the local filesystem!");
	} catch (error) {
		onFail(error.message);
		notify(
			"Movies data",
			"Something went wrong while storing the data in the filesystem",
		);
	}
}

export function readMoviesData(renderData, onSuccess, onFail, notify) {
	try {
		const moviesPath = ensureDirSync("movies");
		const moviesPathJSONFile = join(moviesPath, "popular.json");

		readLocalFile(moviesPathJSONFile, function handleFileRead(err, jsonData) {
			if (err) {
				notify(
					"Movies data",
					"Something went wrong while loading the data from the filesystem",
				);
				return onFail(err.message);
			}

			const data = JSON.parse(jsonData);

			renderData(data.page, data.total_pages, data.results);
			onSuccess("Movies data loaded");
			notify(
				"Movies data",
				"The data has been loaded from the local filesystem!",
			);
		});
	} catch (error) {
		onFail(error.message);
	}
}
