'use strict';

function ColoursRedGreenBlue(kod16) {
  const red16 = kod16.substring(0, 2);
  const green16 = kod16.substring(2, 4);
  const blue16 = kod16.substring(4, 6);
  this.red = parseInt(red16, 16);
  this.green = parseInt(green16, 16);
  this.blue = parseInt(blue16, 16);
}

const map = new Map();

this.maper = function(dataParse) {
  for (const i in dataParse.kod16) {
    const colourObject = new ColoursRedGreenBlue(dataParse.kod16[i]);
    map.set(dataParse.name[i], colourObject);
  }
  return map;
};
