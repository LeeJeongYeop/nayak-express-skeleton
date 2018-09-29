'use strict';

const expressValidation = require('express-validation');
const log = require('./config/logger');
const errors = require('./errors');

module.exports = (app) => {
  const error_code = {
    INVALID_PARAMETER: 9401,
    SERVER_ERROR: 500
  };

  app.use((err, req, res, next) => {
    // Custom error logging title.
    const log_title = `\n\x1b[31m[ERROR Handler]\u001b[0m\n\x1b[34m[Request PATH - ${req.path}]\u001b[0m\n`;

    // Custom error division.
    let response = errors[isNaN(err) ? error_code.SERVER_ERROR : err];
    if (err instanceof expressValidation.ValidationError) {  // Wrong Parameter
      response = errors[error_code.INVALID_PARAMETER];
      response.miss_param = err.errors.map(error => error.messages.join('. ')).join('\n');
    }

    // Custom error logging.
    log.error(log_title.concat(typeof response.miss_param !== 'undefined' ?
      `\x1b[36m[Miss Params] \u001b[0m \n${response.miss_param}` : err));

    return res.status(response.status).json(response);
  });
};