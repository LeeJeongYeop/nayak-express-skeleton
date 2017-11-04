'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

process.env.NODE_ENV = ( process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() === 'production' ? 'production' : 'development' );

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS ALL ACCESS Settings
app.use(cors());

// initialize routes
require('./routes')(app);

// error handler
require('./ErrorHandler')(app);

// Server Port Set
const PORT = 3000;
app.listen(PORT, () => {
  console.info(`[Server] Application Listening on Port ${PORT}`);
});

module.exports = app;
