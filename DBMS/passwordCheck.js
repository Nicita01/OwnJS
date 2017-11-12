'use strict';

const fs = require('fs');
const readline = require('readline');
const DBMS = require('./DBMS.js');

let DataBase = {};

fs.readFile('./DataBase.json', 'utf8', (err, data) => {
  if (err) throw err;
  DataBase = JSON.parse(data);
})

const pass = (passwordSet) => (passwordEntered) => {
  if (passwordSet === passwordEntered) return true;
  else return false;
};

// Usage
exports.login = (rl) => {
  rl.question('Username: ', (answer) => {
    const username = answer;
    const userId =  DataBase['/Users']['logins'][username];
    if (userId === undefined) {
      console.log('No such user registered.');
      rl.close()
      return;
    }
    const userPass = pass(DataBase['/Users']['pass'][userId]);

    rl.question('Password: ', (answer) => {
      const password = answer;
      rl.pause()
      if (userPass(password)) console.log(`ID ${userId} access alowed`);
      else console.log(`ID ${userId} access denied`);
      DBMS.selectLanguage();
    });
  });
}
