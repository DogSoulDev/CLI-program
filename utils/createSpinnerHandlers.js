export function createSpinnerSuccessHandler(spinner) {
  return function onSpinnerSuccess(message = "Data loaded") {
    return spinner.succeed(message);
  };
}

export function createSpinnerErrorHandler(spinner) {
  return function onSpinnerError(message = "Failed to fetch the persons data") {
    return spinner.succeed(message);
  };
}