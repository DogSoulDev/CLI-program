import { chalkSettings } from "./settings.js";

//Main settings
const { white, bold, yellow, blue, magenta, gray, breakLine, tab } =
  chalkSettings;
const log = console.log;

//Object for rendering messages
const renderMessages = {
  also_known_as: "Also known as:",
  noAlias: "doesn’t have any alternate names",
  genre: "Genres:",
  noGenre: "The movie doesn’t have a declared genre",
  language: "Language:",
  noLanguage: "doesn’t have any declared languages",
};

/**
 * It takes two arguments, a page number and a total number of pages, and renders a page number and
 * total number of pages to the console.
 */
export function renderPages(page, total_pages) {
  log(
    white(`
          ----------------------------------------
          ${breakLine}
          Page: ${page} of ${total_pages}
          ${breakLine}`)
  );
}

/**
 * It takes an array, a name, and a message. If the array has items, it logs the name and the items. If
 * the array is empty, it logs the message
 */
export function arrayRender(arrayToRender, name, message) {
  if (arrayToRender.length > 0) {
    log(white(`${name}${breakLine}`));
    arrayToRender.map((item) => {
      log(`${white(item)}${breakLine}`);
    });
    return;
  }

  log(`${yellow(message)}${breakLine}`);
}

/**
 * It renders the data of a person
 */
export function renderPersonsData({ page, results, total_pages }) {
  results.map(({ id, name, known_for_department, known_for }) => {
    log(
      white(`
      ----------------------------------------
      ${breakLine}
      Person:
      ${breakLine}
      ID: ${id}
      Title: ${bold(blue(name))}
      ${
        known_for_department === "Acting" &&
        `Department: ${magenta(known_for_department)}${breakLine}`}`)
    );

    //Check if character appears in any movie
    const appearInMovie = known_for.some((movie) => {
      return movie.title !== undefined;
    });

    //Render if person appears in movies
    if (appearInMovie) {
      log(
        white(`
      Appearing in movies:`)
      );
      known_for.map(({ id, title, release_date }) => {
        if (title) {
          log(
            white(
              `
              ${tab}Movie:
              ${tab}ID: ${id}
              ${tab}Release Date: ${release_date}
              ${tab}Title: ${title}
            `
            )
          );
        }
      });
    } else {
      log(`${tab}${yellow(`${name} doesn't appear in any movie`)}`);
    }
  });

  if (total_pages > page) {
    renderPages(page, total_pages);
  }
}

/**
 * It renders the movie data to the console
 */
export function renderMoviesData({ page, results, total_pages }) {
  results.forEach(({ id, title, release_date }) => {
    log(
      white(`
          ----------------------------------------
          ${breakLine}
          Movie:
          ${breakLine}
          ID: ${id}
          Title: ${bold(blue(title))}
          Release Date: ${release_date}
          `)
    );
  });

  if (total_pages > page) {
    renderPages(page, total_pages);
  }
}

/**
 * It renders a person's data to the console
 */
export function renderPersonData({
  id,
  name,
  birthday,
  place_of_birth,
  known_for_department,
  biography,
  also_known_as,
}) {
  log(
    white(`
${breakLine}
----------------------------------------
${breakLine}
Person:
${breakLine}
ID: ${id}
Name: ${bold(blue(name))}
Birthday: ${birthday} ${gray("|")} ${place_of_birth}
${
  known_for_department === "Acting" &&
  `Department: ${magenta(known_for_department)}`
}
Biography: ${blue(bold(biography))}
  `)
  );

  arrayRender(
    also_known_as,
    renderMessages.also_known_as,
    `${name}${renderMessages.noAlias}`
  );
}

/**
 * It renders a movie's data to the console
 */
export function renderMovieData({
  id,
  title,
  release_date,
  runtime,
  vote_count,
  overview,
  genres,
  spoken_languages,
}) {
  log(
    white(`
    ${breakLine}
----------------------------------------
${breakLine}
Movie:
${breakLine}
ID: ${id}
Title: ${bold(blue(title))}
Release Date: ${release_date}
Runtime: ${runtime}
Vote Count: ${vote_count}
Overview: ${overview}
`)
  );

  if (genres.length > 0) {
    log(white(`${renderMessages.genre}${breakLine}`));
    genres.map((item) => {
      log(`${white(item.name)}${breakLine}`);
    });
    return;
  } else {
    log(`${yellow(renderMessages.noGenre)}${breakLine}`);
  }

  if (spoken_languages.length > 0) {
    log(white(`${renderMessages.spoken_languages}${breakLine}`));
    spoken_languages.map((lang) => {
      log(`${white(lang.name)}${breakLine}`);
    });
    return;
  } else {
    log(
      `${yellow(
        `The movie: ${title} ${renderMessages.noLanguage}`
      )}${breakLine}`
    );
  }
}
