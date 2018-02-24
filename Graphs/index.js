'use strict';

const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

//**
const validData = (graph) => false;
let graphString = '';
let graph = new Map();

firstLine();
function firstLine() {
  let countVersh = 0;
  rl.question('Введіть матрицю суміжності:\n', (firstLine) => {
    graphString = firstLine + '\n';
    let countVersh = firstLine.length;
    otherLine(countVersh);
  });
  validData(graphString) ? console.log('error') : wrapHasVersh(graphString);
}

function otherLine(countVersh) {
  let countLine = 1;
  rl.on('line', (line) => {
    if (++countLine === countVersh) {
      rl.removeAllListeners('line');
      graphString = graphString + line
      parseGraph(graphString);
    } else {
      graphString = graphString + line + '\n';
    }
  })
}

function parseGraph (graphString) {
  graphString.split('\n').map( (line, index) => {
    let lineArr = line.split('').map( (cur, index) => {
      cur = parseInt(cur);
      return [++index, cur];
    })
    graph.set(index + 1, lineArr);
  });
  wrapHasVersh(graph);
  console.log(graph);
}

function wrapHasVersh(graph) {
  rl.question('Введіть номер вершини для видалення:\n', (versh) => {
    validData(versh) ? console.log('error') : deleteVersh(graph, versh);
  })
}

function deleteVersh(graph, versh) {
  cashVershForDelete = [
    versh,
  ];
  for ( let curCash in cashVershForDelete ) {
    for ( let versh in graph.entries()) {
      versh[1][parseInt(curCash)] //...
    }
  }

  console.log('done');
}
