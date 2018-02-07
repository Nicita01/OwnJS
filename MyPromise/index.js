'use strict';

// const EventEmitter = require('events').EventEmitter; // ???

function MyPromise(func) {
  if (typeof(func) !== 'function') {
    throw new TypeError(func + ' is not a function');
  }
  this._promiseState = "pending";
  this._promiseResult = undefined;
  this._promiseFulfillReactions = [];
  this._promiseRejectReactions = [];

  const res = (result) => {
    this._promiseState === "pending" && this._onResolve(result);
  }

  const rej = (resultError) => {
    this._promiseState === "pending" && this._onReject(resultError);
  }
  process.nextTick(func, res, rej);
}

MyPromise.prototype._onResolve = function(result) {
  this._promiseState = "fulfilled";
  this._promiseResult = result;
  const resultCur = this._promiseFulfillReactions[0](this._promiseResult);
  this._promiseFulfillReactions.shift();
  this._promiseRejectReactions.shift();
  if (!(resultCur instanceof MyPromise )) {
    let resPromiseCur = {};
    Object.assign(resPromiseCur, this);
    resPromiseCur.__proto__ = this.__proto__;
    if (this._promiseFulfillReactions[0]) {
      this._onResolve.call(resPromiseCur, resultCur)
    } else return resultCur
  } else {
    Object.assign(resultCur._promiseFulfillReactions, this._promiseFulfillReactions);
    Object.assign(resultCur._promiseRejectReactions, this._promiseRejectReactions);
  }
};

MyPromise.prototype._onReject = function(resultError) {
  this._promiseState = "rejected";
  this._promiseResult = resultError;
  const resultCur = this._promiseRejectReactions[0](this._promiseResult);
  this._promiseFulfillReactions.shift();
  this._promiseRejectReactions.shift();
  if (!(resultCur instanceof MyPromise )) {
    let resPromiseCur = {};
    Object.assign(resPromiseCur, this);
    resPromiseCur.__proto__ = this.__proto__;
    if (this._promiseFulfillReactions[0]) {
      this._onResolve.call(resPromiseCur, resultCur)
    } else return resultCur
  } else {
    Object.assign(resultCur._promiseFulfillReactions, this._promiseFulfillReactions);
    Object.assign(resultCur._promiseRejectReactions, this._promiseRejectReactions);
  }
};

MyPromise.prototype.then = function(resFunc, rejFunc) {
  let resFuncGeneral;
  let rejFuncGeneral
  if (typeof(resFunc) !== 'function') {
    resFuncGeneral = (res) => res;
  } else {
    resFuncGeneral = resFunc
  }
  if (typeof(rejFunc) !== 'function') {
    rejFuncGeneral = (err) => err;
  } else {
    rejFuncGeneral = rejFunc;
  }
  switch(this._promiseState) {
    case "pending":
    this._promiseFulfillReactions.push(resFuncGeneral);
    this._promiseRejectReactions.push(rejFuncGeneral);
      return this;
    case "fulfilled":
      return this._onResolve(this._promiseResult); 
    case "rejected":
      return this._onReject(this._promiseResult);
  }
}

MyPromise.prototype.catch = function(rejFunc) {
  return MyPromise.prototype.then.call(this, null, rejFunc)
}

///////////////\\\\\\\\\\\/////////////////

// tests::

///////////////\\\\\\\\\\\////////////////

// const promise = new MyPromise((res, rej) => {
//   console.log('started');
//   setTimeout(() => {
//     console.log('ended')
//     res(12);
//     //rej(new Error('error')) //ignored
//   }, 1000);
// })

// promise
//   .then(res => {
//     console.log('first then')
//   })
//   .then(res => {
//     return new MyPromise((res, rej) => {
//       setTimeout(() => {
//        console.log('second then')
//        res(1)
//       }, 1000);
//     })
//   })
//   .catch(rej => {
//     console.log(err);
//   })
//   .then(rej => {
//     return new MyPromise((res, rej) => {
//       setTimeout(() => {
//         console.log('third then');
//         res(1)
//       }, 1000);
//     })
//   })
//   .then(res => {
//     console.log('fourth then')
//   })













