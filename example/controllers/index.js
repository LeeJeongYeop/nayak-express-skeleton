'use strict';

const fs = require('fs');
const list = fs.readdirSync(__dirname).filter(dir => !dir.match(/(^\.)|index/i));

if (process.env.NODE_ENV === 'development') {
  console.log(`[Controller Loaded]:`, list);
}

for (let ctrl of list) {
  module.exports[ctrl.replace(/\.js*/,'')] = require('./' + ctrl);
}

