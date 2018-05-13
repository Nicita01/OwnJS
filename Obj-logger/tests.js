'use strict';
Error.stackTraceLimit = 100;
const Logger = require(__dirname + '/logger.js');

function* gen() {
  yield 1;
  yield 2;
}

let genn = gen();
genn = Logger(genn);
genn.next();
genn.next();