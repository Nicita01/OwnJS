'use strict';

const is = require(__dirname + '/IM.js');

let arr = [];
for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
  arr.push([]);
  for (let j = i; j < i + 26; j++) {
    arr[i - 'a'.charCodeAt()].push(String.fromCharCode(j > 'z'.charCodeAt() ? j - 26 : j));

  }
}

if (module.parent) {
  module.exports = decoder; 
} else {
  const fs = require('fs');
  const codeText = fs.readFileSync(__dirname + '/codeText.txt', 'utf8');
  const correct = {
    'q':1, 'w':1, 'e':1, 'r':1, 't':1, 'y':1, 'u':1, 'i':1, 
    'o':1, 'p':1, 'a':1, 's':1, 'd':1, 'f':1, 'g':1, 'h':1, 
    'j':1, 'k':1, 'l':1, 'z':1, 'x':1, 'c':1, 'v':1, 'b':1, 'n':1, 'm':1
  };
  codeText.split('').forEach((cur) => {
    if (!(cur in correct)) {
      throw new Error('in codeText.txt bad for decoding text. Change it');
    }
  })
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the key:\n', key => {
    const decodingText = decoder(codeText, key).join('');
    console.log(
      '\x1b[31mДЕКОДИРОВАННЫЙ ТЕКСТ:\x1b[0m\n', decodingText);
      fs.writeFileSync(__dirname + '/decodeText.txt', decodingText, 'utf8');
  })
}

function decoder(text, key) {
  let result = [];
  let keyArr = [];
  let textArr = [];
  if (typeof(key) === 'string') {
    keyArr = key.split('');
  } else {
    keyArr = key;
  }
  if (typeof(text) === 'string') {
    textArr = text.split('');
  } else {
    textArr = text;
  }
  for (let r in textArr) {
    let keyy = keyArr[r % keyArr.length] 
    //console.log(keyy);
    let curArr = arr[keyy.charCodeAt() - 'a'.charCodeAt()];
    //console.log(textArr[r], '  ',arr[0].indexOf(textArr[r]));
    //console.log(curArr);
    result[r] = arr[0][curArr.indexOf(textArr[r])];
  }
 // console.log(is(result.join('')));
  return result;
}
//f(require('fs').readFileSync(__dirname + '/chiper.text', 'utf8') , 'sdfghtre');
