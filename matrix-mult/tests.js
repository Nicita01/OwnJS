'use strict';

const multiplicator = require(__dirname + '/index.js');

const multTest = multiplicator(
  [[1, 2], [3, 2], [1, 6], [2, 5]], [[4, 2, 1, 4, 1], [4, 5, 3, 2, 3]]
);

console.log(multTest);

// [ [ 12, 12, 7, 8, 7 ],
//   [ 20, 16, 9, 16, 9 ],
//   [ 40, 38, 22, 28, 22 ],
//   [ 28, 29, 17, 18, 17 ] ]
