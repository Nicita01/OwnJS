'use strict';

const makeGraph = require(__dirname + '/graph-maker');
const Heap = require(__dirname + '/binary-heap.js');

let rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let dataStrArr = require('fs')
.readFileSync(__dirname + '/input.txt')
.toString()
.split('\n');

process.stdout.write('  '); // TODO: more letters
for (let curSymb = 0; curSymb < dataStrArr[0].split('').length; curSymb++) {
  process.stdout.write(String.fromCharCode('A'.charCodeAt() + curSymb));
}
console.log('');
for (let curString in dataStrArr) {
  console.log(curString, dataStrArr[curString].replace(/ /g, String.fromCharCode(45)));
}

const dataArr = dataStrArr.map(curStr => curStr.split(''));

// TODO: валидация входных данных и вводимых знаечний

rl.question('Введите координаты начала пути (в формате A0): ', (start) => {
  rl.question('Введите координаты цели: ', (finish) => {
    let arrOfRes = makeGraph(dataArr, start, finish);
    let started = arrOfRes[0];
    // rl.close();
    aStar(started, finish, arrOfRes[1]);
  });
});

function aStar(startNode, finish, arrGraph) {
  let finishX = finish.charCodeAt() - 'A'.charCodeAt();
  let finishY = parseInt(finish[1]);
  let heap = new Heap([0, startNode]);
  console.log(heap);
  console.log(heap.root)
  let curNode;
  while (heap.root) {
    curNode = heap.get();
    // if (curNode.freeze) continue;
    console.log('\n\n\n');
    console.log(curNode);
    if (curNode.isFinish) break;
    console.log('isFinish', curNode);
    curNode.freeze = true;
    for (let curNeighbor of curNode.notFreezeNeighbors()) {
      let newCost = curNode.length + 1;
      if (newCost < curNeighbor.length) {
        curNeighbor.length = newCost;
        curNeighbor.wentFrom = curNode;
        let distanse = Math.abs(curNeighbor.X - finishX) + Math.abs(curNeighbor.Y - finishY);
        heap.add(distanse + newCost, curNeighbor);
        console.log('isFinish', heap);
      }
    }
  }
  // console.log(startNode);
  console.log('\n\n\n\n');
  reverseRound(arrGraph, finishX, finishY)
  
}

function reverseRound(graph, finishX, finishY) {
  let curNode = graph[finishY][finishX];
  for (let curNodeIndex = curNode.length; curNodeIndex >= 0; curNodeIndex--) {
    curNode.forOutputData = "\x1b[31m+"
    curNode = curNode.wentFrom;
  }
  for (let i in graph) {
    for (let j in graph[i]) {
      try {
        rl.write(graph[i][j].forOutputData);
      } catch (e) {
        rl.write("\x1b[0mx");
      }
    }
    rl.write('\n')
  }
  rl.close();
}
