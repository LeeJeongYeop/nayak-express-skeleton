'use strict';

const mysql = require('mysql');
const DBConfig = require('./../config/DBConfig');
const pool = mysql.createPool(DBConfig);

const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 *  Authenticate
 *  @param: token
 */
exports.auth = (token, done) => {
  jwt.verify(token, config.jwt.cert, (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt expired': return done(10401);
        case 'invalid token': return done(10403);
        default: return done(err.message);
      }
    } else {
      const sql =
        `
        Authenticate SQL Query
        `;

      pool.query(sql, [decoded.id], (err, rows) => {
        if (err) {
          return done(err);
        } else {
          if (rows.length === 0) {
            return done(401);
          } else {
            // Authenticate
            return done(null, rows[0].user);  // example
          }
        }
      })
    }
  });
};
