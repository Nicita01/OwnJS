'use strict';

const MyPromise = require(__dirname + 'index.js');

const promise = new MyPromise((res, rej) => {
  console.log('started');
  setTimeout(() => {
    console.log('ended')
    res(12);
    //rej(new Error('error')) //ignored
  }, 1000);
})

promise
  .then(res => {
    console.log('first then')
  })
  .then(res => {
    return new MyPromise((res, rej) => {
      setTimeout(() => {
       console.log('second then')
       res(1)
      }, 1000);
    })
  })
  .catch(rej => {
    console.log(err);
  })
  .then(rej => {
    return new MyPromise((res, rej) => {
      setTimeout(() => {
        console.log('third then');
        res(1)
      }, 1000);
    })
  })
  .then(res => {
    console.log('fourth then')
  })

  // TODO: Add tests for paralel works
