'use strict';

let commandID;

const switchCommand = {
  select: "sql",
  insert: "sql",
  delete: "sql",
  update: "sql",
  "/manual": "man",
  "/showdb": "db",
  "/signup": "reg",
  // "/"
};

Object.defineProperty(switchCommand, 'giver', {
  enumerable: false,
  set: (command) => {
    if(switchCommand[command] !== undefined){
      commandID = switchCommand[command];
    } else commandID = 'err1';
  }
});

exports.parser = (command) => {
  switchCommand.giver = command.split(' ')[0].toLowerCase();
  return commandID;
};
