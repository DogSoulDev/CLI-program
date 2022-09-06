function createSpinnerSuccessHandler(spinner) {
  return function onSpinnerSuccess(message = "Data loaded") {
    return spinner.succeed(message);
  };
}

function createSpinnerErrorHandler(spinner) {
  return function onSpinnerError(message = "Failed to fetch the persons data") {
    return spinner.succeed(message);
  };
}

module.exports = {
  createSpinnerSuccessHandler: createSpinnerSuccessHandler,
  createSpinnerErrorHandler: createSpinnerErrorHandler,
};