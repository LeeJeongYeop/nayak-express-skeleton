'use strict';

const winston = require('winston');
const moment = require('moment');

/**
 * If you use winston logger,
 * you must make the 'logFiles' directory at your project root.
 */
const logger = new winston.Logger({
  transports: [
    process.env.NODE_ENV === 'production' ?
      /* only used server */
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        filename: './logFiles/logging-',
        maxsize: 1000 * 1024,
        datePattern: 'yyyy-MM-dd.log',
        json: false,
        timestamp: () => {return moment().format('YYYY-MM-DD HH:mm:ss');}
      })
      :
      new (winston.transports.Console)({
        level: 'info',
        colorize: true
      })
  ]
});

module.exports = logger;