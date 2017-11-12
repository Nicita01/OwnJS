'use strict';

const fs = require('fs');
const rl = require('readline');
// const sql = require('./SQLtoJS.js');
const valid = require('./validAccess.js');
const parserCommand = require('./parser.js');
const passwordCheck = require('./passwordCheck.js');
const passwordSet = require('./passwordSet.js');


const dir = __dirname;
let hintNumber;
let language;
let activeUserID;

const data = fs.readFileSync('./DataBase.json', 'utf8');
const users = JSON.parse(data)['/Users'];

const hints = fs.readFileSync(dir + '/hints.json', 'utf8');
const hintParse = JSON.parse(hints);

const inter = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});


if (!users) passwordSet.signUp(inter);
else passwordCheck.login(inter);


exports.selectLanguage = () => {
  inter.question('Select the language: en/ru\n', (choiseLanguage) => {
  language = choiseLanguage === 'en' ? (() => {hintNumber = 1; return 0})() :
             choiseLanguage === 'ru' ? (() => {hintNumber = 1; return 1})() :
             (() => {hintNumber = 0; selectLanguage()})();
  showHint(hintNumber);
  language === undefined ? () => {} : onStart();
  });
};

function showHint(hintNumber) {
  hintParse[0][hintNumber] === undefined ?
  () => {} : inter.write(hintParse[language][hintNumber]);
};

function onStart() {
  showHint(2);
  setTimeout(
    () => fs.access(dir + '/DataBase.json', fs.constants.F_OK, (err) => {
      !err ? (() => {
        showHint(3);
        inter.write('\x1b[36m ' + dir + '/DataBase.json\n' + '\x1b[0m');
        showHint(5);
      })() : (() => {
        showHint(4);
      })();
      readCommand();
    }), 1500);
};

function readCommand() {
  let commandID;
  inter.question('', (command) => {
    commandID = parserCommand.parser(command);
    showHint(commandID);
    switch (commandID) {
      case 'man': {
        showHint(6);
        break;
      }
      case 'reg':{
        showHint(8);
        passwordSet.signUp(inter);
      }
    };
       //else if (commandID === 'sql') {
    //  sql
  //  }

    readCommand();
  })
};
