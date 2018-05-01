'use strict';

const makeGraph = require(__dirname + '/graph-maker');
const Heap = require(__dirname + '/binary-heap.js');

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataStrArr = require('fs')
  .readFileSync(__dirname + '/input.txt')
  .toString()
  .split('\n');

process.stdout.write('  ');
for (let curSymb = 0; curSymb < dataStrArr[0].split('').length; curSymb++) {
  process.stdout.write(String.fromCharCode('A'.charCodeAt() + curSymb));
}
process.stdout.write('\n');
for (const curString in dataStrArr) {
  console.log(curString, dataStrArr[curString].replace(/[1234567890 ]/g, '-'));
}
// FIXME: если лабиринт не прямоугольной формы, будут неправильно отображаться
// оси с координатами.
const dataArr = dataStrArr.map(curStr => curStr.split('').map(
  curSymb => (parseInt(curSymb) == curSymb ? parseInt(curSymb) : curSymb)
));
// TODO: валидация входных данных и вводимых знаечний
rl.question('Введите координаты начала пути (в формате A0): ', (start) => {
  rl.question('Введите координаты цели: ', (finish) => {
    const startX = start.charCodeAt() - 'A'.charCodeAt();
    const startY = parseInt(start[1]);
    const finishX = finish.charCodeAt() - 'A'.charCodeAt();
    const finishY = parseInt(finish[1]);
    const graphFoundation = makeGraph(dataArr);
    const startNode = graphFoundation[startY][startX];
    startNode.length = startNode.complexity;
    // rl.close();
    aStar(startNode, finishX, finishY);
    output(graphFoundation);
  });
});

function aStar(startNode, finishX, finishY) {
  const heap = new Heap([0, startNode]);
  let curNode;
  while (heap.root) {
    curNode = heap.get();
    if (curNode.x == finishX && curNode.y == finishY) {
      reverseRound(curNode);
      return;
    }
    for (const curNeighbor of curNode.notFreezeNeighbors()) {
      const newCost = curNode.length + curNeighbor.complexity;
      if (newCost < curNeighbor.length) {
        curNeighbor.length = newCost;
        curNeighbor.wentFrom = curNode;
        const distanse = Math.abs(curNeighbor.X - finishX) + Math.abs(curNeighbor.Y - finishY);
        heap.add(distanse + newCost, curNeighbor);
      }
    }
  }
  // TODO: Добраться невозможно
}

function reverseRound(finishNode) {
  let curNode = finishNode;
  while (curNode) {
    curNode.complexity = '\x1b[31m' + curNode.complexity;
    curNode = curNode.wentFrom;
  }
}

function output(graphFoundation) {
  for (const curStr in graphFoundation) {
    for (const curColumn in graphFoundation[curStr]) {
      if (graphFoundation[curStr][curColumn]) {
        process.stdout.write(graphFoundation[curStr][curColumn].complexity + '');
        process.stdout.write('\x1b[0m');
      } else {
        process.stdout.write(dataArr[curStr][curColumn]);
      }
    }
    process.stdout.write('\n');
  }
  rl.close();
}
