'use strict';

const switchCommand = {
  select: "sql",
  insert: "sql",
  delete: "sql",
  update: "sql",
  "/manual": "man",
  "/showdb": "db"
};

Object.defineProperty(switchCommand, 'giver', {
  enumerable: false,
  set: (firstWord) => {
    if(switchCommand[firstWord] !== undefined){
      commandID = switchCommand[firstWord];
    } else commandID = 'err1'
  }
});

let commandID;
exports.parser = function(command){
  switchCommand.giver = command.split(' ')[0].toLowerCase();
  return commandID;
};
