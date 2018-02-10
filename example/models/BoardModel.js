'use strict';

const pool = require('../config/config').pool;
const transactionWrapper = require('./TransactionWrapper');


/**
 * Board List
 */
exports.list = () => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT *
      FROM board
      `;

    pool.query(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Board Read
 * @param: board_id
 */
exports.read = (board_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      `
      SELECT *
      FROM board
      WHERE id = ?
      `;

    pool.query(sql, [board_id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Board Write
 * @param: board_data = { user_id, title, contents }
 */
exports.write = (board_data) => {
  return new Promise((resolve, reject) => {
      const sql =
        `
        INSERT INTO board SET ?
        `;

      pool.query(sql, board_data, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.affectedRows === 1) {
            resolve(rows);
          } else {
            const _err = new Error("Board Write Error");
            reject(_err);
          }
        }
      });
    }
  ).then((result) => {
    return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT *
        FROM board
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
 * Comment Write
 * @param: comment_data = { user_id, board_id, Comment }
 */
exports.commentWrite = (comment_data) => {
  return new Promise((resolve, reject) => {
    transactionWrapper.getConnection(pool)
      .then(transactionWrapper.beginTransaction)
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            INSERT INTO comment SET ?
            `;

          context.conn.query(sql, comment_data, (err, rows) => {
            if (err) {
              context.error = err;
              reject(context);
            } else {
              if (rows.affectedRows === 1) {
                context.result = rows;
                resolve(context);
              } else {
                context.error = new Error("Comment Write Error");
                reject(context);
              }
            }
          });
        });
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            UPDATE board SET comment_count = comment_count + 1
            WHERE id = ?
            `;

          context.conn.query(sql, [comment_data.board_id], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context);
            } else {
              if (rows.affectedRows === 1) {
                resolve(context);
              } else {
                context.error = new Error("Board Comment Count Update Error");
                reject(context);
              }
            }
          });
        })
      })
      .then((context) => {
        return new Promise((resolve, reject) => {
          const sql =
            `
            SELECT *
            FROM comment
            WHERE id = ?
            `;

          context.conn.query(sql, [context.result.insertId], (err, rows) => {
            if (err) {
              context.error = err;
              reject(context);
            } else {
              context.result = rows;
              resolve(context);
            }
          });
        })
      })
      .then(transactionWrapper.commitTransaction)
      .then((context) => {
        context.conn.release();
        resolve(context.result);
      })
      .catch((context) => {
        context.conn.rollback(() => {
          context.conn.release();
          reject(context.error);
        });
      });
  });
};