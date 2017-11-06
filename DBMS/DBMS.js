'use strict';

const fs = require('fs');
const rl = require('readline');
const tt = require('./SQLtoJS.js');

const inter = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
let hintNumber;
let language;
const dir = __dirname;
selectLanguage()

function selectLanguage(){
  inter.question('Select the language: en/ru\n', function(choiseLanguage){
  language = choiseLanguage === 'en' ? (() => {hintNumber = 1; return 0})() :
             choiseLanguage === 'ru' ? (() => {hintNumber = 1; return 1})() :
             (() => {hintNumber = 0; selectLanguage()})();
  showHint(hintNumber);
  language === undefined ? () => {} : setTimeout(onStart, 1000);
  });
};

const hint = fs.readFileSync(dir + '/hints.json');
const hintParse = JSON.parse("" + hint);
function showHint(hintNumber){
  hintNumber === 0 ? () => {} : inter.write(hintParse[language][hintNumber]);
};

function onStart(){
  showHint(2);
  setTimeout(
    () => fs.access(dir + '/DataBase.json', fs.constants.F_OK, (err) => {
      !err ? (() => {
        showHint(3);
        inter.write('\x1b[36m' + ' ' + dir + '/DataBase.json\n' + '\x1b[37m');
        showHint(5);
      })() : (() => {
        inter.write('\x1b[31m');
        showHint(4);
      })()
    }), 1500);
};

