'use strict';

const winston = require('winston');
const moment = require('moment');

const formatConfig = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    info: 3
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    info: 'green'
  }
};
winston.addColors(formatConfig.colors);

/**
 * If you use winston logger,
 * you must make the 'logFiles' directory at your project root.
 */
const logger = winston.createLogger({
  transports: [
    process.env.NODE_ENV === 'production' ?
      /* only used server */
      new (require('winston-daily-rotate-file'))({
        level: 'info',
        filename: './logFiles/logging-%DATE%.log',
        maxsize: 1000 * 1024,
        datePattern: 'YYYY-MM-DD',
        json: false,
        timestamp: () => {return moment().format('YYYY-MM-DD HH:mm:ss');}
      })
      :
      new (winston.transports.Console)({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
        level: 'info'
      })
  ]
});

module.exports = logger;