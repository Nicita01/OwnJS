'use strict';

const Logger = obj => {
  // if (typeof obj !== 'object') {
  //   throw new  TypeError(obj, ' is not an object');
  // }
  return new Proxy(obj, {
    getPrototypeOf(target) {
      const prototype = Object.getPrototypeOf(target);
      console.log('getPrototypeOf\n  result:', prototype);
      return prototype;
    },
    setPrototypeOf(target, prototype) {
      const setProtoStatus = Reflect.setPrototypeOf(target, prototype);
      console.log(
        'setPrototypeOf\n  prototype:', prototype, '\n  result:', setProtoStatus
      );
      return setProtoStatus;
    },
    isExtensible(target) {
      const isExtensible = Object.isExtensible(target);
      console.log('isExtensible\n  result:', isExtensible);
      return isExtensible;
    },
    preventExtensions(target) {
      const extensionStatus = Reflect.preventExtensions(target);
      console.log('preventExtensions\n  result:', extensionStatus);
      return extensionStatus;
    },
    getOwnPropertyDescriptor: (target, property) => {
      const descriptor = Object.getOwnPropertyDescriptor(target, property);
      console.log(
        'getOwnPropertyDescriptor\n  property:', property, '\n  result:', descriptor
      );
      return descriptor;
    },
    defineProperty(target, property, descriptor) {
      const defineStatus = Reflect.defineProperty(target, property, descriptor);
      console.log(
        'defineProperty\n  key:', property,
        '\n  descriptor:', descriptor,
        '\n  result:', defineStatus
      );
      Object.defineProperty(target, property, descriptor);
      return defineStatus;
    },
    has(target, property) {
      console.log('has\n  key:', property, '\n  result:', property in target);
      return property in target;
    },
    get: (target, property) => {
      const value = Reflect.get(target, property);
      console.log('get\n  key:', property, '\n  result:', value);
      return value;
    },
    set(target, property, value) {
      const setStatus = Reflect.set(target, property, value);
      console.log(
        'set\n  key:', property, '\n  value:  ', value, '\n  result:', setStatus
      );
      return setStatus;
    },
    deleteProperty(target, property) {
      const deleteStatus = Reflect.deleteProperty(target, property);
      console.log(
        'deleteProperty\n  property:', property, '\n  result:', deleteStatus
      );
      return deleteStatus;
    },
    enumerate(target) {
      const iterator = Reflect.enumerate(target);
      console.log('enumerate\n  result:', iterator);
      return iterator;
    },
    ownKeys: target => {
      const ownKeys = Reflect.ownKeys(target);
      console.log('ownKeys\n  result:', ownKeys);
      return ownKeys;
    },
    apply: target => {
      const apply = Reflect.apply(target);
      console.log('apply\n  result:', apply);
      return apply;
    },
    construct: target => {
      const construct = Reflect.construct(target);
      console.log('construct\n  result:', construct);
      return construct;
    }
  });
}

module.exports = Logger;
