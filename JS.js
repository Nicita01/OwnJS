'use strict';
/*
const arr = 'der asd asdf sf',
      a = 'ssdfffff',
      c = 'adaaaa 66';
var neew = arr.split(' ');
for(var i=0; i < neew.length; i++){
  console.log(`${arr} ddtr ${a} ${c}`);
};
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'treg'
});
rl.on('SIGINT', () => {
  console.log(1222);
});
rl.question('\nEnter the number', (number) =>{
  console.log(number+'treg');
});
var counter = 0;
rl.on('line', (data) => {
  console.log(data);
  ++counter;
  if (counter === 3){
    console.log(counter);
  } else if (counter === 5){
    console.log(counter - 3);
    rl.close();
    readline.cursorTo(process.stdin, 15, 1);
  };
});
