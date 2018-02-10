'use strict';

const crypto = require('crypto');
const mysql = require('mysql');
let pool;

/**
 * DB Connections Info
 */
exports.pool;
exports.createDBPool = (connectionLimit) => {
  this.pool = mysql.createPool({
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "board",
    "connectionLimit": connectionLimit
  });
};

/**
 * Crypto
 */
exports.doCipher = (inputpass) => {
  const salt = "SALT STRING";
  const iterations = 100;
  const keylen = 24;

  const derivedKey = crypto.pbkdf2Sync(inputpass, salt, iterations, keylen, 'sha512');

  return Buffer.from(derivedKey, 'binary').toString('hex');
};

/**
 * jwt
 */
exports.jwt =  {
  cert: "JWT CERT STRING"
};