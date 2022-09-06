import { white, blue, magenta, yellow, gray } from "chalk";


const log = console.log;

function renderPersonsData(page, totalPages, persons) {
	if (totalPages > page) {
		log(white(`\n\n----------------------------------------`));
		log(`Page: ${white(page)} of: ${white(totalPages)}`);
	}

	persons.forEach(function renderPerson(person) {
		log(white(`----------------------------------------`));
		log(`\n`);
		log(`${white(`Person:\n`)}`);
		log(`ID: ${white(person.id)}`);
		log(`Name: ${blue.bold(person.name)}`);

		if (person.known_for_department === "Acting") {
			log(`Department: ${magenta(person.known_for_department)}`);
		}

		const hasAnyMovieWIthTitle = person.known_for.some(function knownForMovie(
			movie,
		) {
			return movie.title !== undefined;
		});

		if (hasAnyMovieWIthTitle) {
			log(white(`\nAppearing in movies:`));

			person.known_for.forEach(function knownFor(movie) {
				if (movie.title) {
					log(`\n`);
					log(`\t${white(`Movie:`)}`);
					log(`\tID: ${white(movie.id)}`);
					log(`\tRelease Date: ${white(movie.release_date)}`);
					log(`\tTitle: ${white(movie.title)}`);
					log(`\n`);
				}
			});
		} else {
			log(`\n`);
			log(yellow(`${person.name} doesn’t appear in any movie\n`));
		}
	});
}

function renderPersonData(person) {
	log(white(`\n----------------------------------------`));
	log(`${white(`Person:\n`)}`);
	log(`ID: ${white(person.id)}`);
	log(`Name: ${blue.bold(person.name)}`);
	log(
		`Birthday: ${white(person.birthday)} ${gray("|")} ${white(
			person.place_of_birth,
		)}`,
	);

	if (person.known_for_department === "Acting") {
		log(`Department: ${magenta(person.known_for_department)}`);
	}

	log(`Biography: ${blue.bold(person.biography)}`);

	if (person.also_known_as.length > 0) {
		log(`\n`);
		log(`${white(`Also known as:\n`)}`);

		person.also_known_as.forEach(function personAKA(alias) {
			log(white(alias));
		});
	} else {
		log(`\n`);
		log(yellow(`${person.name} doesn’t have any alternate names\n`));
	}
}

function renderMoviesData(page, totalPages, movies) {
	if (totalPages > page) {
		log(white(`\n\n----------------------------------------`));
		log(`Page: ${white(page)} of: ${white(totalPages)}`);
	}

	movies.forEach(function renderMovie(movie) {
		log(white(`----------------------------------------`));
		log(`\n`);
		log(`${white(`Movie:\n`)}`);
		log(`ID: ${white(movie.id)}`);
		log(`Title: ${blue.bold(movie.title)}`);
		log(`Release Date: ${white(movie.release_date)}`);
		log(`\n`);
	});
}

function renderMovieData(movie) {
	log(white(`\n----------------------------------------`));
	log(`\n`);
	log(`${white(`Movie:\n`)}`);
	log(`ID: ${white(movie.id)}`);
	log(`Title: ${blue.bold(movie.title)}`);
	log(`Release Date: ${white(movie.release_date)}`);
	log(`Runtime: ${white(movie.runtime)}`);
	log(`Vote Count: ${white(movie.vote_count)}`);
	log(`Overview: ${white(movie.overview)}`);
	log(`\n`);
	log(`${white(`Genres:\n`)}`);

	if (movie.genres.length > 0) {
		movie.genres.forEach(function showMovieGenre(genre) {
			log(white(genre.name));
		});
	} else {
		log(yellow("The movie doesn’t have a declared genre"));
	}

	log(`\n`);
	log(`${white(`Spoken Languages:\n`)}`);

	if (movie.spoken_languages.length > 0) {
		movie.spoken_languages.forEach(function showMovieLanguages(lang) {
			log(white(lang.name));
		});
	} else {
		log(
			yellow(
				`The movie: ${movie.id} doesn’t have any declared languages`,
			),
		);
	}
}

function renderMovieReviewsData(page, totalPages, reviews, movieID) {
	console.log(movieID);

	if (reviews.length > 0) {
		if (totalPages > page) {
			log(white(`\n\n----------------------------------------`));
			log(`Page: ${white(page)} of: ${white(totalPages)}`);
		}

		log(white(`\n----------------------------------------`));
		log(`\n`);

		reviews.forEach(function showMovieGenre(review) {
			let reviewText = review.content;
			if (review.content.length > 400) {
				reviewText = review.content.slice(0, 400) + "...";
			}

			log(`Author: ${blue.bold(review.author)}`);
			log(`Content: ${white(reviewText)}`);
			log(`\n`);
		});
	} else {
		log(yellow(`\nThe movie: ${movieID} doesn’t have any reviews`));
	}
}

export const renderPersonsData = renderPersonsData;
export const renderPersonData = renderPersonData;
export const renderMoviesData = renderMoviesData;
export const renderMovieData = renderMovieData;
export const renderMovieReviewsData = renderMovieReviewsData;
