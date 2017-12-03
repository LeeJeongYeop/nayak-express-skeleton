const Joi = require('joi');

module.exports = {
  /**
   * User Validation
   */
  // POST - /user/sign-up
  user_sign_up: {
    body: {
      user_id: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // POST - /user/sign-in
  user_sign_in: {
    body: {
      user_id: Joi.string().required(),
      password: Joi.string().required()
    }
  },

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