'use strict';
const fs = require('fs');
const main = require(__dirname + '/main');
function ColourWithCode(name) {
  this.name = name;
  this.colour = [];
}

let result = {};
this.userColour = function(map, colour) {
  for (const i of ['red', 'green', 'blue']) {
    result = new ColourWithCode(i);
    for (const j of map.entries()) {
      if (j[1][i] === colour) {
        result.colour.push(j[0]);
      }
    }
    console.log('\x1b[36m' + result.name + '\x1b[37m');
    console.dir(result.colour, {
      showHidden: false,
      depth: null,
      colors: true
    });
    const surrealizeResult = JSON.stringify(result);
    resultToFile(surrealizeResult);
  }
  main.getUserColour();
};

this.errValid = function(err) {
  console.log('\x1b[31mError: ' + '\x1b[37m' + err);
};

function resultToFile(result) {
  fs.open(__dirname + '/map.txt', 'a', (err, fd) => {
    fs.write(fd, result, 'etf8', (err, countBites, string) => {
      fs.close(fd);
    });
  });
}
