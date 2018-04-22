'use strict';

let rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let dataStrArr = require('fs')
.readFileSync(__dirname + '/input.txt')
.toString()
.split('\n');

console.log('  ABCDEFGH'); // TODO: mode letters
for (let curString in dataStrArr) {
  console.log(curString, dataStrArr[curString].replace(/ /g, String.fromCharCode(45)));
}

const dataArr = dataStrArr.map(curStr => curStr.split(''));
console.log(dataArr)

// TODO: валидация входных данных и вводимых знаечний

rl.question('Введите координаты начала пути (в формате A0):', (start) => {
  rl.question('Введите координаты цели:', (finish) => {
    let startX = start.charCodeAt() - 'A'.charCodeAt();
    let startY = parseInt(start[1])
    let finishX = finish.charCodeAt() - 'A'.charCodeAt();
    let finishY = parseInt(finish[1])
    makeGraph(dataStrArr, startX, startY, finishX, finishY);
    rl.close();
  })
})
const arrArrsNodes = [] // [[{}, {}], [{}, {}]]

function GrateGraph(curString, curColumn, start = false, finish = false) {
  this.up = null;
  this.down = null;
  this.left = null;
  this.right = null;
  // let up = arrArrsNodes[curString - 1][curColumn]; 
  if (curString != 0 && arrArrsNodes[curString - 1][curColumn]) {
    console.log('curString', curString)
    this.up = arrArrsNodes[curString - 1][curColumn];
    arrArrsNodes[curString - 1][curColumn].down = this;
  }
  if (curColumn != 0 && arrArrsNodes[curString][curColumn - 1]) {
    this.left = arrArrsNodes[curString][curColumn - 1];
    arrArrsNodes[curString][curColumn - 1].right = this;
  }
  this.freeze = start;
  this.length = start ? 0 : Infinity;
  this.wentFrom = null;
  this.OTL = curString + curColumn;
  this.ifFinish = finish;
}

function makeGraph(dataStrArr, startX, startY, finishX, finishY) {
  console.log(startX, startY, finishX, finishY);
  for (let curString in dataArr) {
    arrArrsNodes[curString] = [];
    for (let curColumn in dataArr[curString]) {
      if (dataArr[curString][curColumn] !== ' ') {
        arrArrsNodes[curString][curColumn] = null;
        continue;
      }
      let isStart = curString == startY && curColumn == startX;
      let ifFinish = curString == finishY && curColumn == finishX;
      arrArrsNodes[curString][curColumn] = new GrateGraph(
        curString, curColumn, isStart, ifFinish
      );
    }
  }
  console.dir(arrArrsNodes, {depth: null})
   /* OTL: */ console.log(arrArrsNodes[1][1].up.down.up.down.up.down); // OK
   module.exports = arrArrsNodes[startX, startY];
}
