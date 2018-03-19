'use strict';

// If an ordinary user wants to overwrite a secret field,
// we can not throw error or forbid it,
// since then he will understand that the field is occupied.
// Instead, all calls to the secret field, after being recorded by the ordinary user,
// will be redirected to a specially created field simulating a secret field,
// and storing information that the user tried to write to the secret field

function hideSymbol(obj, symbol) {
  obj = {
    realObj: Object.assign(obj),
    simulateSecretField: undefined
  };

  // As a result, the field obj.simulateSecretField in the object itself remained free
  // And the user can use it as a normal fieldw

  obj = new Proxy(obj, {
    ownKeys: (target) => {
      if (symbol in target.realObj) {
        let properties = Reflect.ownKeys(target.realObj);
        const indexField = properties.indexOf(symbol);
        properties.splice(indexField, 1);
        if (target.simulateSecretField) {
          properties = properties.concat(symbol);
        }
        return properties;
      } else {
        return Reflect.ownKeys(target);
      }
    },

    get: (target, property) => {
      if (property === symbol && target.simulateSecretField) {
        return target.simulateSecretField;
      }
      if (property === symbol && target.simulateSecretField === undefined) {
        return undefined;
      }
      return target.realObj[property];
    },

    set: (target, property, value) => {
      if (property === symbol) {
        return Reflect.set(target, 'simulateSecretField', value);
      } else {
        return Reflect.set(target.realObj, property, value);
      }
    },

    getOwnPropertyDescriptor: (target, property) => {
      if (property === symbol && target.simulateSecretField) {
        return  Object.getOwnPropertyDescriptor(target, 'simulateSecretField');
      }
      if (property === symbol && target.simulateSecretField === undefined) {
        return undefined;
      }
      return Reflect.getOwnPropertyDescriptor(target.realObj, property);
    },

    enumerate: (target) => {
      return target.keys[Symbol.iterator];
    },

    deleteProperty(target, property) {
      if (property !== symbol) {
        delete target.realObj[property];
      } else if (property === symbol && target.simulateSecretField) {
        target.simulateSecretField = undefined;
      }
      return true;
    },
  });
  return obj;
}

// Usage:

// we have added an opcional method _debugOutputSecretField,
// to check at the end of the work that the information in the secret field was left
// This is the only way to verify this information
// (This field should not be in a real project)

let obj = {
  name: 'Marcus Aurelius',
  born: 121,
  [Symbol.for('secret')]: 'some secret information',
  [Symbol.for('notsecret')]: 'some not secret information',
  get getter() {
    return 'GETTER';
  },
  set setter(value) {},
  get _debugOutputSecretField() {
    return this[Symbol.for('secret')];
  }
};
