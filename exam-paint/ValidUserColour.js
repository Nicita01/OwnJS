'use strict';

this.validUserColour = function(colour) {
  colour = parseFloat(colour);
  if (Object.is(colour, NaN)) return "Вы ввели не число";
  if (colour > 255 || colour < 0) return "Введите число в диапазоне [0, 255]";
  if (!(colour % 1 === 0)) return "Введите целое число"
}
