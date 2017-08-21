'use strict';

const crypto = require('crypto');

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