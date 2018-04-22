'use strict';

const makeGraph = require(__dirname + '/graph-maker');

let rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let dataStrArr = require('fs')
.readFileSync(__dirname + '/input.txt')
.toString()
.split('\n');

console.log('  ABCDEFGH'); // TODO: more letters
for (let curString in dataStrArr) {
  console.log(curString, dataStrArr[curString].replace(/ /g, String.fromCharCode(45)));
}

const dataArr = dataStrArr.map(curStr => curStr.split(''));
console.log(dataArr)

// TODO: валидация входных данных и вводимых знаечний

rl.question('Введите координаты начала пути (в формате A0):', (start) => {
  rl.question('Введите координаты цели:', (finish) => {
    let starter = makeGraph(dataArr, start, finish);
    rl.close();
    console.log(starter)
  })
})