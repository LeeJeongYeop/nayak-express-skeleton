'use strict';

exports.getConnection = (pool) => {
  return new Promise((resolve, reject) => {

    pool.getConnection((err, conn) => {
      const context = {
        conn: conn
      };
      if (err) {
        context.error = err;
        return reject(context);
      } else {
        return resolve(context);
      }
    });
  });
};

exports.beginTransaction = (context) => {
  return new Promise((resolve, reject) => {

    context.conn.beginTransaction((err) => {
      if (err) {
        context.error = err;
        return reject(context);
      } else{
        return resolve(context);
      }
    });
  });
};

exports.commitTransaction = (context) => {
  return new Promise((resolve, reject) => {

    context.conn.commit((err) => {
      if (err) {
        context.error = err;
        return reject(context);
      } else{
        return resolve(context);
      }
    });
  });
};