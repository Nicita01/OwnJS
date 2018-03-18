'use strict';

const Logger = require(__dirname + '/logger.js');

let obj1 = {
  a: 1,
  b: 2
}
obj1 = Logger(obj1);

console.log('\n\x1b[4m\x1b[1mconsole.log(obj1)\x1b[0m');
console.log(obj1);

console.log('\n\x1b[4m\x1b[1mconsole.dir(obj1)\x1b[0m');
console.dir(obj1);

let obj2 = {
  c: 3,
  [Symbol.for('d')]: 4,
}

obj2 = Logger(obj2);

console.log('\n\n\x1b[4m\x1b[1mObject.defineProperties\x1b[0m')

Object.defineProperties(obj2, {
  [Symbol.for('f')]: {
    enumerable: false,
    writable: false,
    value: 6
  },
  'e': {
    enumerable: true,
    writable: true,
    value: 5,
    configurable: false
  }
});

console.log('\n\x1b[4m\x1b[1mChange obj2.__proto__\x1b[0m')
obj2.__proto__ = {
  p: 100,
}


console.log('\n\x1b[4m\x1b[1mObject.getPrototypeOf(obj2)\x1b[0m')
console.log(Object.getPrototypeOf(obj2));

console.log('\n\x1b[4m\x1b[1mdelete\x1b[0m')
delete obj2.c;
console.log(Object.getOwnPropertyNames(obj2));

console.log('\n\x1b[4m\x1b[1mObject.keys(obj2)\x1b[0m');
console.log(Object.keys(obj2));

console.log('\n\x1b[4m\x1b[1mobj2.badName:\x1b[0m')
console.log(obj2.badName);

console.log(obj2)