'use strict';

const graphFoundation = []; // [[{}, {}], [{}, {}]]

function NodeGrateGraph(data, curString, curColumn) {
  this.x = curColumn;
  this.y = curString;
  // this.isFreeze = false;
  this.length = Infinity;
  this.wentFrom = null;
  this.complexity = data === ' ' ? 0 : data;
  this.up = null;
  this.down = null;
  this.left = null;
  this.right = null;
  if (curString != 0 && graphFoundation[curString - 1][curColumn]) {
    this.up = graphFoundation[curString - 1][curColumn];
    graphFoundation[curString - 1][curColumn].down = this;
  }
  if (curColumn != 0 && graphFoundation[curString][curColumn - 1]) {
    this.left = graphFoundation[curString][curColumn - 1];
    graphFoundation[curString][curColumn - 1].right = this;
  }
}

NodeGrateGraph.prototype.notFreezeNeighbors = function() {
  const allNeighbors = [this.left, this.right, this.down, this.up];
  const neighbors = allNeighbors.filter(neighbors => neighbors !== null);
  const notFreeze = neighbors.sort(neighbors => neighbors.isFreeze === false);
  return notFreeze;
};

function makeGraph(dataArr) {
  for (const curString in dataArr) {
    graphFoundation[curString] = [];
    for (const curColumn in dataArr[curString]) {
      if ((dataArr[curString][curColumn] + '').search(/[0123456789 ]/)) {
        graphFoundation[curString][curColumn] = null;
        continue;
      }
      graphFoundation[curString][curColumn] = new NodeGrateGraph(
        dataArr[curString][curColumn], curString, curColumn
      );
    }
  }
  return graphFoundation;
}

module.exports = makeGraph;
