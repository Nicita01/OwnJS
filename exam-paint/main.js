'use strict';

const dir = __dirname;

const mapMaker = require(dir + '/MapMaker');
const input = require(dir + '/Input');
const output = require(dir + '/Output');
const validUserColour = require(dir + '/ValidUserColour');

const dataParse = input.dataParse;
const map = mapMaker.maper(dataParse);

this.getUserColour = function() {
  input.makePromise().then((colour) => {
    const err = validUserColour.validUserColour(colour);
    if (err) {
      output.errValid(err);
      this.getUserColour();
    } else {
      output.userColour(map, parseInt(colour, 10));
    }
  });
};

this.getUserColour();
