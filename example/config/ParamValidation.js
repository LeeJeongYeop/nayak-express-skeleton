const Joi = require('joi');

module.exports = {
  /**
   * Board Validation
   */
  // POST - /board
  board_write: {
    body: {
      title: Joi.string().required(),
      contents: Joi.string().required()
    }
  },
  // GET - /board/:board_id
  board_read: {
    params: {
      board_id: Joi.number().required()
    }
  },
  // POST - /board/:board_id/comment
  board_comment: {
    params: {
      board_id: Joi.number().required()
    },
    body: {
      comment: Joi.string().required()
    }
  }
};