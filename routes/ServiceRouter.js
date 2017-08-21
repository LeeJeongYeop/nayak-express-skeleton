'use strict';

const validate = require('express-validation');
const ParamValidation = require('../config/ParamValidation');

const controller = require('../controllers');
const AuthCtrl = controller.AuthCtrl;
const BoardCtrl = controller.BoardCtrl;


module.exports = (router) => {
  // Here Routing URL

  // Board
  router.route('/board')
    .get(BoardCtrl.list)
    .post(AuthCtrl.auth, validate(ParamValidation.board_write), BoardCtrl.write);
  router.route('/board/:board_id')
    .get(AuthCtrl.auth, validate(ParamValidation.board_read), BoardCtrl.read);
  router.route('/board/:board_id/comment')
    .post(AuthCtrl.auth, validate(ParamValidation.board_comment), BoardCtrl.commentWrite);

  return router;
};