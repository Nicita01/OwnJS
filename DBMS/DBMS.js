'use strict';

const fs = require('fs');
const rl = require('readline');

const inter = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
let hintNumber;
let language;
let dir = __dirname
selectLanguage()

function selectLanguage(){
  inter.question('Select the language: en/ru\n', function(choiseLanguage){
  language = choiseLanguage === 'en' ? (() => {hintNumber = 1; return 0})() :
                 choiseLanguage === 'ru' ? (() => {hintNumber = 1; return 1})() :
                 (() => {hintNumber = 0; selectLanguage()})();
  showHint(hintNumber);
  setTimeout(onStart(12), 2000)
  });
};

const hint = fs.readFileSync(dir + '/hints.json');
const hintParse = JSON.parse("" + hint);
function showHint(hintNumber){
  hintNumber === 0 ? () => {} : inter.write(hintParse[language][hintNumber]);
};
function fff(){console.log(language); rl.pause};
function onStart(dir){
  showHint(2)
};
