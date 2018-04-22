'use strict';

const arrArrsNodes = [] // [[{}, {}], [{}, {}]]

function GrateGraph(curString, curColumn, start = false, finish = false) {
  this.up = null;
  this.down = null;
  this.left = null;
  this.right = null;
  if (curString != 0 && arrArrsNodes[curString - 1][curColumn]) {
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
      arrArrsNodes[curString][curColumn] = new GrateGraph(
        curString, curColumn, isStart, ifFinish
      );
    }
  }
  return arrArrsNodes[startX, startY];
}

module.exports = makeGraph