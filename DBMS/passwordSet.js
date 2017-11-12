'use strict';

const fs = require('fs');
const readline = require('readline');
const DBMS = require('./DBMS.js');

let DataBase = {};

fs.readFile('./DataBase.json', 'utf8', (err, data) => {
  if (err) throw err;
  if (!data) return;
  DataBase = JSON.parse(data);
})

// Usage
exports.signUp = (rl) => {
  rl.question('Set your username: ', (answer) => {
    let maxId = 0;
    for (let i in DataBase['/Users']['logins']) {
      if (answer === i) {
        console.log('Username already exist.');
        rl.close()
        return;
      }
      maxId = DataBase['/Users']['logins'][i];
    }
    const username = answer;
    DataBase['/Users']['logins'][username] = maxId + 1;

    rl.question('Set your password: ', (answer) => {
      const id = DataBase['/Users']['logins'][username];
      DataBase['/Users']['pass'][id] = answer;
      const data = JSON.stringify(DataBase, null, 2);
      fs.writeFile('./DataBase.json', data, (err) => {
        if (err) throw err;
      });
      console.log('New account created.');
      DBMS.selectLanguage();
      // rl.close()
    });
  });
}
