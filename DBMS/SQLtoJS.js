'use strict';

const fs = require('fs');
const valid = require('./validAccess.js');

const dir = __dirname
const DB = fs.readFileSync(dir + '/DataBase.json');
const parseDB = JSON.parse("" + DB);

const userAccessNumber =
parseDB['/Users']['ControlSummAccess'][
  parseDB['/Users']['logs'][activeUserName]
];

const controlAccessNumber = parseDB['/DirectoryAccess'][IDaccess][table];

const validAccess = valid.validAccess(controlAccessNumber, userAccessNumber);
