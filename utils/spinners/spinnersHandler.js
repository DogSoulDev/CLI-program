import ora from "ora";

/**
 * It takes in a color, a type, and a message, and returns a spinner with those properties.
 * @param spinnerMessage - The spinner message.
 * @returns The spinner
 */
export const createSpinner = (spinnerMessage) => {
  return ora({
    text: spinnerMessage,
  }).start();
};

/**
 * Set spinner to fail
 * @param spinner - The spinner object
 */
export const spinnerHandlerOnError = (spinner, message) => {
  return spinner.fail(message);
};

/**
 * Set spinner to success
 * @param spinner - The spinner object
 */
export const spinnerHandlerOnSuccess = (spinner, message) => {
  return spinner.succeed(message);
};
