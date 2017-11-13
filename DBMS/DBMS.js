'use strict';

const fs = require('fs');
const rl = require('readline');
// const sql = require('./SQLtoJS.js');
const valid = require('./validAccess.js');
const parserCommand = require('./parser.js');
const passwordCheck = require('./passwordCheck.js');
const passwordSet = require('./passwordSet.js');

const inter = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});

let hintNumber;
let language;
const dir = __dirname;
let activeUserName;
let ParseDB = {};

selectLanguage();


function selectLanguage(){
  inter.question('Select the language: en/ru\n', function(choiseLanguage){
  language = choiseLanguage === 'en' ? (() => {hintNumber = 1; return 0})() :
             choiseLanguage === 'ru' ? (() => {hintNumber = 1; return 1})() :
             (() => {hintNumber = 0; selectLanguage()})();
  showHint(hintNumber);
  language === undefined ? () => {} : setTimeout(onStart, 1000);
  });
};





function signInUp(){
  showHint(7);
  inter.question('', (string) => {
    if (string === '/reg') {
      reg();
    } else if (string === '/login'){
      showHint(8);
      inter.question('', (login) => {
        let findUserInSystem = false;
        for (let logInSystem in ParseDB['/Users']['logins']){
          if (login === logInSystem){
            logPass(login);
            findUserInSystem = true;
          }
        };
        if ( !findUserInSystem ){
          showHint('err5');
          signInUp();
        }
      });
    } else if(string === '/manual'){
      showHint(6);
      signInUp();
    } else {
      signInUp();
    }
  })
};

function reg(){
  let loginFree = true;
  let userMaxID = 0;
  showHint(10);
  inter.question('', (newLogin) => {
    for ( let logInSystem in  ParseDB['/Users']['logins']){
      if (newLogin === logInSystem){
        showHint('err2');
        loginFree = false;
        reg();
      };
      userMaxID < ParseDB['/Users']['logins'][logInSystem] ?
      userMaxID = ParseDB['/Users']['logins'][logInSystem] : () => {};
    };
    if (loginFree === true) {
      regPass(newLogin, userMaxID)
    };
  });
};

function regPass(newLogin, userMaxID){
  showHint(11);
  inter.question('\x1b[8m', (firstPass) => {
    inter.write('\x1b[0m')
    showHint(12);
    inter.question('\x1b[8m', (secondPass) => {
      inter.write('\x1b[0m')
      if( secondPass !== firstPass){
        showHint('err3');
        regPass();
      } else {
        ParseDB['/Users']['logins'][newLogin] = userMaxID + 1;
        ParseDB['/Users']['pass'][userMaxID + 1] = firstPass;
        ParseDB['/Users']['ControlSummAccess'][userMaxID + 1] = 9;
        fs.writeFileSync( dir + '/DataBase.json', JSON.stringify(ParseDB));
        showHint(13);
        inter.write('\x1b[36m' + newLogin + '\x1b[0m\n');
        activeUserName = newLogin;
        readCommand();
      };
    });
  });
};

function logPass(login){
  showHint(9);
  inter.question('', (pass) => {
    if (ParseDB['/Users']['pass'][
      ParseDB['/Users']['logins'][login]] === pass){
      activeUserName = login;
      showHint(13);
      inter.write('\x1b[36m' + login + '\x1b[0m\n');
      readCommand();
    } else {
        showHint('err4');
        logPass();
      };
  });
}








const hint = fs.readFileSync(dir + '/hints.json');
const hintParse = JSON.parse("" + hint);
function showHint(hintNumber){
  hintParse[1][hintNumber] === undefined ?
  () => {} : inter.write(hintParse[language][hintNumber]);
};

function onStart(){
  showHint(2);
  setTimeout(
    () => fs.access(dir + '/DataBasae.json', fs.constants.F_OK, (err) => {
      !err ? (() => {
        const DB = fs.readFileSync(dir + '/DataBase.json');
        ParseDB = JSON.parse("" + DB);
        showHint(3);
        inter.write('\x1b[36m ' + dir + '/DataBase.json\n' + '\x1b[0m\x1b[4m\x1b[1m');
        showHint(5);
        inter.write('\x1b[0m');
        signInUp();
      })() : (() => {
        inter.write('\x1b[31m');
        showHint(4);
        inter.write('\x1b[0m');
      })();
    }), 1500);
};

function readCommand(){
  let commandID = '';
  inter.question('', function(command){
    commandID = parserCommand.parser(command);
    showHint(commandID);
    if (commandID === 'man') {
      showHint(6)
    } else if (commandID === 'ln') {
      language = language === 0 ? 1 : 0;
      showHint(1);
    }//else if (commandID === 'sql') {
      //sql.
  //  }

    readCommand();
  })
};
