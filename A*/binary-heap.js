'use strict';

function Heap() {
  this.root = null;
  this.last = null;
  this.countNodes = 0;
}

function Node(priority, data) {
  this.priority = priority;
  this.data = data;
  this.parent = null;
  this.childLeft = null;
  this.childRight = null;
}

Heap.prototype.getByIndex = function(index) {
  if (index === 1) {
    return this.root;
  }
  let curNode = this.root;
  let curIndex = index;
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
    return curNode.childRight;
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

Heap.prototype.getMax = function() {
  let max = this.root.data;
  let last = this.getByIndex(this.countNodes);
  this.root.priority = last.priority;
  this.root.data = last.data;
  last.parent[this.countNodes % 2 ? 'childRight' : 'childLeft'] = null;
  console.log(last)
  let curNode = this.root;
  let curMaxChild = curNode.childLeft ? curNode.childRight ?
    curNode.childRight.priority > curNode.childLeft.priority ?
    curNode.childLeft : curNode.childRight : curNode.childLeft : null;
  while (curNode.childLeft && curMaxChild.priority < curNode.priority) {
    let tempData = curNode.data;
    let tempPriority = curNode.priority;
    curNode.data = curMaxChild.data;
    curNode.priority = curMaxChild.priority;
    curMaxChild.data = tempData;
    curMaxChild.priority = tempPriority;
    curNode = curMaxChild;
    curMaxChild = curNode.childLeft ? curNode.childRight ?
    curNode.childRight.priority > curNode.childLeft.priority ?
    curNode.childLeft : curNode.childRight : curNode.childLeft : null;
  }
  return max;
}

// Tests:

// const f = new Heap();

// f.add(20, 3);
// f.add(10, 4);
// f.add(23, 4);
// f.add(12, 4);
// f.add(8, 's')
// // console.dir(f, {depth: null})
// // console.log('MINMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
// console.log(f.getMax());
// console.dir(f, {depth: null})
// // console.log(f.getByIndex(5))
// console.log('asdadasdasd')
// setTimeout(() => console.dir(f, {depth: null}), 5000)