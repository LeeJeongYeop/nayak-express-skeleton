'use strict';

const expressValidation = require('express-validation');
const log = require('./config/logger');
const errors = require('./errors');

module.exports = (app) => {
  const error_code = {
    INVALID_PARAMETER: 9401,
    SERVER_ERROR: 500
  };

  app.use((err, req, res) => {
    // Error Log
    log.error(`\n\x1b[31m[ERROR Handler] \u001b[0m \n\x1b[34m[Request PATH - ${req.path}] \u001b[0m \n`, err);

    let miss_param = false;
    if (err instanceof expressValidation.ValidationError) {  // Wrong Parameter
      miss_param = err.errors.map(error => error.messages.join('. ')).join('\n');
      log.error(`\n\x1b[36m[Miss Params] \u001b[0m \n${miss_param}`);
      err = error_code.INVALID_PARAMETER;
    } else if (isNaN(err)) {  // Server Error
      err = error_code.SERVER_ERROR;
    }

    const response_error = errors[err];
    response_error.miss_param = miss_param ? miss_param : undefined;

    return res.status(response_error.status).json([
      response_error
    ]);
  });
};