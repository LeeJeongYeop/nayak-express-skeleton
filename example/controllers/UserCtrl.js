'use strict';

const config = require('../config/config');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');

/**
 * Sign Up
 */
exports.signUp = async (req, res, next) => {
  let result = '';

  try {
    const user_data = {
      user_id: req.body.user_id,
      password: config.doCipher(req.body.password)
    };

    result = await userModel.signUp(user_data);

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

/**
 * Sign In
 */
exports.signIn = async (req, res, next) => {
  let result = {};

  try {
    const user_data = {
      user_id: req.body.user_id,
      password: config.doCipher(req.body.password)
    };

    result.user_info = await userModel.signIp(user_data);
    result.token = jwt.sign(result.user_info, config.jwt.cert, {expiresIn: '10h'});

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};