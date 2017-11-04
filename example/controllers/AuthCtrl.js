'use strict';

const authModel = require('../models/AuthModel');

/**
 * Simple Authenticate
 */
exports.auth = (req, res, next) => {
  if (!req.headers.token) {
    return next(401);
  } else {
    authModel.auth(req.headers.token, (err, user) => {
      if (err) {
        return next(err);
      } else {
        // Success
        req.user = user;  // example
        return next();
      }
    });
  }
};