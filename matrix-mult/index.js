'use strict';

function multiplicator(matrixF, matrixS) {
  valid(matrixF, matrixS);
  const res = matrixF.map((curVectorF) =>
    matrixS[0].map((_, indexS) =>
      curVectorF.reduce((prev, curNumberF, index) =>
        prev + curNumberF * matrixS[index][indexS], 0)
    )
  );
  return res;
}

function valid(matrixF, matrixS) {
  if (!(Array.isArray(matrixF)) || !(Array.isArray(matrixS))) {
    throw new TypeError('arg must be an array');
  }
  if (!(Array.isArray(matrixF[0])) || !(Array.isArray(matrixS[0]))) {
    throw new TypeError('arg must me an array of arrays');
  } else {
    const countColumnF = matrixF[0].length;
    const countColumnS = matrixS[0].length;
    if (matrixS.length !== countColumnF) {
      throw new Error('these matrices can not be multiplied');
    }
    matrixF.forEach((curVector) => {
      if (!(Array.isArray(curVector))) {
        throw new TypeError('arg must me an array of arrays');
      } else if (curVector.length !== countColumnF) {
        throw new TypeError('vectors must be of the same dimension');
      }
      curVector.forEach(curNumb => {
        if (typeof(curNumb) !== 'number') {
          throw new TypeError('coordinate must be a number');
        }
      });
    });
    matrixS.forEach((curVector) => {
      if (!(Array.isArray(curVector))) {
        throw new TypeError('arg must me an array of arrays');
      } else if (curVector.length !== countColumnS) {
        throw new TypeError('vectors must be of the same dimension');
      }
      curVector.forEach(curNumb => {
        if (typeof(curNumb) !== 'number') {
          throw new TypeError('coordinate must be a number');
        }
      });
    });
  }
}

module.exports = multiplicator;
