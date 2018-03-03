'use strict';

const fs = require('fs');
const readline = require('readline');


const file = __dirname + '/colours.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const data = fs.readFileSync(file, 'utf8');
this.dataParse = JSON.parse(data);

this.makePromise = function() {
  const promiseInputColour = new Promise(
    (resolve, reject) => {
      rl.question('Введите число в десятеричной системе: ', (colour) => {
        resolve(colour);
        reject(colour);
      });
    });
  return promiseInputColour;
};
