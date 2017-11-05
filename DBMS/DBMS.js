'use strict';

const fs = require('fs');
const rl = require('readline');

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
  language === undefined ? '' : setTimeout(onStart, 1000);
  });
};

const hint = fs.readFileSync(dir + '/hints.json');
const hintParse = JSON.parse("" + hint);
function showHint(hintNumb){
  hintNumb === 0 ? () => {} : inter.write(hintParse[language][hintNumb]);
};

function onStart(){
  showHint(2);
  fs.access(dir + '/DataBase.json', fs.constants.F_OK, (err) => {
    !err ? (() => {
      showHint(3);
      console.log('\x1b[35m' + ' ' + dir + '/DataBase.json')
    })() : console.log(12);
  });

};
