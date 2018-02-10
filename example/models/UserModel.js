'use strict';

const pool = require('../config/config').pool;

/**
 * Sign Up
 * @param: user_data = { user_id, password }
 */
exports.signUp = (user_data) => {
  return new Promise((resolve, reject) => {
      const sql =
        `
        INSERT INTO user SET ?
        `;

      pool.query(sql, user_data, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("User Write Error");
            reject(_err);
          }
        }
      });
    }
  ).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT user_id
        FROM user
        WHERE id = ?
        `;

      pool.query(sql, [result.insertId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

/**
 * Sign In
 * @param: user_data = { user_id, password }
 */
exports.signIn = (user_data) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT user_id
      FROM user
      WHERE user_id = ? AND password = ?
      `;

    pool.query(sql, [user_data.user_id, user_data.password], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve({user_id: rows[0].user_id});
      }
    });
  });
};