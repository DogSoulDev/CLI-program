import chalk from "chalk";


const log = console.log;

export function renderPersonsData(page, totalPages, persons) {
	if (totalPages > page) {
		log(chalk.white(`\n\n----------------------------------------`));
		log(`Page: ${chalk.white(page)} of: ${chalk.white(totalPages)}`);
	}

	persons.forEach(function renderPerson(person) {
		log(chalk.white(`----------------------------------------`));
		log(`\n`);
		log(`${chalk.white(`Person:\n`)}`);
		log(`ID: ${chalk.white(person.id)}`);
		log(`Name: ${chalk.blue.bold(person.name)}`);

		if (person.known_for_department === "Acting") {
			log(`Department: ${chalk.magenta(person.known_for_department)}`);
		}

		const hasAnyMovieWIthTitle = person.known_for.some(function knownForMovie(
			movie,
		) {
			return movie.title !== undefined;
		});

		if (hasAnyMovieWIthTitle) {
			log(chalk.white(`\nAppearing in movies:`));

			person.known_for.forEach(function knownFor(movie) {
				if (movie.title) {
					log(`\n`);
					log(`\t${chalk.white(`Movie:`)}`);
					log(`\tID: ${chalk.white(movie.id)}`);
					log(`\tRelease Date: ${chalk.white(movie.release_date)}`);
					log(`\tTitle: ${chalk.white(movie.title)}`);
					log(`\n`);
				}
			});
		} else {
			log(`\n`);
			log(chalk.yellow(`${person.name} doesn’t appear in any movie\n`));
		}
	});
}

export function renderPersonData(person) {
	log(chalk.white(`\n----------------------------------------`));
	log(`${chalk.white(`Person:\n`)}`);
	log(`ID: ${chalk.white(person.id)}`);
	log(`Name: ${chalk.blue.bold(person.name)}`);
	log(
		`Birthday: ${chalk.white(person.birthday)} ${gray("|")} ${chalk.white(
			person.place_of_birth,
		)}`,
	);

	if (person.known_for_department === "Acting") {
		log(`Department: ${chalk.magenta(person.known_for_department)}`);
	}

	log(`Biography: ${chalk.blue.bold(person.biography)}`);

	if (person.also_known_as.length > 0) {
		log(`\n`);
		log(`${chalk.white(`Also known as:\n`)}`);

		person.also_known_as.forEach(function personAKA(alias) {
			log(chalk.white(alias));
		});
	} else {
		log(`\n`);
		log(chalk.yellow(`${person.name} doesn’t have any alternate names\n`));
	}
}

export function renderMoviesData(page, totalPages, movies) {
	if (totalPages > page) {
		log(chalk.white(`\n\n----------------------------------------`));
		log(`Page: ${chalk.white(page)} of: ${chalk.white(totalPages)}`);
	}

	movies.forEach(function renderMovie(movie) {
		log(chalk.white(`----------------------------------------`));
		log(`\n`);
		log(`${chalk.white(`Movie:\n`)}`);
		log(`ID: ${chalk.white(movie.id)}`);
		log(`Title: ${chalk.blue.bold(movie.title)}`);
		log(`Release Date: ${chalk.white(movie.release_date)}`);
		log(`\n`);
	});
}

export function renderMovieData(movie) {
	log(chalk.white(`\n----------------------------------------`));
	log(`\n`);
	log(`${chalk.white(`Movie:\n`)}`);
	log(`ID: ${chalk.white(movie.id)}`);
	log(`Title: ${chalk.blue.bold(movie.title)}`);
	log(`Release Date: ${chalk.white(movie.release_date)}`);
	log(`Runtime: ${chalk.white(movie.runtime)}`);
	log(`Vote Count: ${chalk.white(movie.vote_count)}`);
	log(`Overview: ${chalk.white(movie.overview)}`);
	log(`\n`);
	log(`${chalk.white(`Genres:\n`)}`);

	if (movie.genres.length > 0) {
		movie.genres.forEach(function showMovieGenre(genre) {
			log(chalk.white(genre.name));
		});
	} else {
		log(chalk.yellow("The movie doesn’t have a declared genre"));
	}

	log(`\n`);
	log(`${chalk.white(`Spoken Languages:\n`)}`);

	if (movie.spoken_languages.length > 0) {
		movie.spoken_languages.forEach(function showMovieLanguages(lang) {
			log(chalk.white(lang.name));
		});
	} else {
		log(
			chalk.yellow(
				`The movie: ${movie.id} doesn’t have any declared languages`,
			),
		);
	}
}

export function renderMovieReviewsData(page, totalPages, reviews, movieID) {
	console.log(movieID);

	if (reviews.length > 0) {
		if (totalPages > page) {
			log(chalk.white(`\n\n----------------------------------------`));
			log(`Page: ${chalk.white(page)} of: ${chalk.white(totalPages)}`);
		}

		log(chalk.white(`\n----------------------------------------`));
		log(`\n`);

		reviews.forEach(function showMovieGenre(review) {
			let reviewText = review.content;
			if (review.content.length > 400) {
				reviewText = review.content.slice(0, 400) + "...";
			}

			log(`Author: ${chalk.blue.bold(review.author)}`);
			log(`Content: ${chalk.white(reviewText)}`);
			log(`\n`);
		});
	} else {
		log(chalk.yellow(`\nThe movie: ${movieID} doesn’t have any reviews`));
	}
}
