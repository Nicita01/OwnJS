'use strict';

function Heap() {
  this.root = null;
  this.last = null;
  this.countNodes = 0;
}

function Node(priority, data) {
  this.parent = null;
  this.priority = priority;
  this.data = data;
  this.childLeft = null;
  this.childRight = null;
}

Heap.prototype.getByIndex = function(index) {
  if (index === 1) {
    return this.root;
  }
  let curNode = this.root;
  let curIndex = index; // Index of root
  while (curIndex !== 2 && curIndex !== 3) {
    let lowerLine = Math.pow(2, parseInt(Math.log2(curIndex)));
    if (curIndex - lowerLine > lowerLine * 2 - 1 - curIndex) {
      curNode = curNode.childRight;
      curIndex = curIndex - lowerLine;
    } else {
      curNode = curNode.childLeft;
      curIndex = curIndex - lowerLine / 2;
    }
  }
  if (curIndex === 2) {
    return curNode.childLeft;
  }
  else if (curIndex === 3) {
    return curNode.childLeft;
  }
  else {
    throw new Error('Error of reading tree');
  }
}

Heap.prototype.add = function(priority, data) {
  if (!(this.countNodes)) {
    this.root = new Node(priority, data);
    this.countNodes++;
    return;
  }
  let parentOfNew = this.getByIndex(Math.floor((this.countNodes + 1) / 2));
  parentOfNew[this.countNodes % 2 ? 'childLeft' : 'childRight'] = new Node(priority, data);
  this.countNodes++;
  let curNode = this.getByIndex(this.countNodes);
  curNode.parent = parentOfNew;
  while (curNode.parent && curNode.priority < curNode.parent.priority) {
    let parent = curNode.parent;
    let tempData = parent.data;
    let tempPriority = parent.priority;
    parent.data = curNode.data;
    parent.priority = curNode.priority;
    curNode.data = tempData;
    curNode.priority = tempPriority;
    curNode = curNode.parent;
  }
}

