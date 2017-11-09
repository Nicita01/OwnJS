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
      commandID = switchCommand[firstWord]; console.log(firstWord);
    } else {commandID = 'err1';console.log(12 + firstWord)};
  }
});
let commandID;
exports.parser = function(command){
  console.log('start '+command);
  switchCommand.giver = command.split(' ')[0].toLowerCase();
  return commandID;
};
