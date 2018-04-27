'use strict';

const arrArrsNodes = [] // [[{}, {}], [{}, {}]]

function NodeGrateGraph(data, curString, curColumn, start = false, finish = false) {
  this.x = curColumn,
  this.y = curString
  this.freeze = start;
  this.length = start ? 0 : 100;
  this.wentFrom = null;
  this.ifFinish = finish;
  this.up = null;
  this.down = null;
  this.left = null;
  this.right = null;
  this.forOutputData = data;
  if (curString != 0 && arrArrsNodes[curString - 1][curColumn]) {
    this.up = arrArrsNodes[curString - 1][curColumn];
    arrArrsNodes[curString - 1][curColumn].down = this;
  }
  if (curColumn != 0 && arrArrsNodes[curString][curColumn - 1]) {
    this.left = arrArrsNodes[curString][curColumn - 1];
    arrArrsNodes[curString][curColumn - 1].right = this;
  }
}

NodeGrateGraph.prototype.notFreezeNeighbors = function() {
  let allNeighbors = [this.left, this.right, this.down, this.up];
  let neighbors = allNeighbors.filter(neighbors => neighbors !== null);
  let notFreeze = neighbors.sort(neighbors => neighbors.isFreeze === false);
  return notFreeze;
}

function makeGraph(dataArr, start, finish) {
  let startX = start.charCodeAt() - 'A'.charCodeAt();
  let startY = parseInt(start[1])
  let finishX = finish.charCodeAt() - 'A'.charCodeAt();
  let finishY = parseInt(finish[1])
  for (let curString in dataArr) {
    arrArrsNodes[curString] = [];
    for (let curColumn in dataArr[curString]) {
      if (dataArr[curString][curColumn] !== ' ') {
        arrArrsNodes[curString][curColumn] = null;
        continue;
      }
      let isStart = curString == startY && curColumn == startX;
      let ifFinish = curString == finishY && curColumn == finishX;
      arrArrsNodes[curString][curColumn] = new NodeGrateGraph(
        dataArr[curString][curColumn], curString, curColumn, isStart, ifFinish
      );
    }
  }
  return [arrArrsNodes[startY][startX], arrArrsNodes];
}

module.exports = makeGraph