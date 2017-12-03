'use strict';

const boardModel = require('../models/BoardModel');


/**
 * Board List
 */
exports.list = async (req, res, next) => {
  let result = '';

  try {
    result = await boardModel.list();

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

/**
 * Board Read
 */
exports.read = async (req, res, next) => {
  let result = '';

  try {
    result = await boardModel.read(req.params.board_id);

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

/**
 * Board Write
 */
exports.write = async (req, res, next) => {
  let result = '';

  try {
    const board_data = {
      user_id: req.user.id,
      title: req.body.title,
      contents: req.body.contents
    };

    console.log(board_data);

    result = await boardModel.write(board_data);
  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

/**
 * Comment Write
 */
exports.commentWrite = async (req, res, next) => {
  let result = '';

  try {
    const comment_data = {
      user_id: req.user.id,
      board_id: req.params.board_id,
      comment: req.body.comment
    };

    result = await boardModel.commentWrite(comment_data);
  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};