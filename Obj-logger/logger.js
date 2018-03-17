'use strict';

function logger(obj){
  if (typeof obj !== 'object') {
    throw new  TypeError(obj, ' is not an object');
  }
  return new Proxy(obj, {
    getPrototypeOf(target) {
      const prototype = Object.getPrototypeOf(target);
      console.log('getPrototypeOf\n  result:', prototype);
      return prototype;
    },
    setPrototypeOf(target, prototype) {
      console.log('setPrototypeOf\n  prototype:', prototype);
      Object.setPrototypeOf(target, prototype);
      return true;
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
    getOwnPropertyDescriptor(targer, prop) {
      const descriptor = Object.getOwnPropertyDescriptor(target, prop);
      console.log(
        'getOwnPropertyDescriptor\n  property:', propp, '\n  result:', descriptor
      );
      return descriptor;
    },
    // !!! Can be a bug
    defineProperty(target, property, desciptor) {
      const defineStatus = Reflect.defineProperty(target, property, desciptor);
      console.log(
        'defineProperty\n  key:', property, 
        '\n  descriptor:', descriptor,
        '\n  result:', defineStatus
      );
      Object.defineProperty(target, property, descriptor);
      return true;
    },
    has(target, property) {
      console.log('has\n  key:', property, '\n  result:', property in targe);
      return property in target;
    },
    get(target, property) {
      const value = Reflect.get(target, property);
      console.log('get\n  key:', property, '\n  result:', value);
      return value;
    },
    set(target, property, value) {
      const setStatus = Reflect.set(target, key, value);
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
    
  })
}