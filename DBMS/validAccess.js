'use strict';

function validAccess(controlAccessNumber, userAccessNumber){
  let access = false;
  for (let i = 1; i <= controlAccessNumber; i = i * 2 ){
    if (userAccessNumber % (i * 2) === 0){
       continue;
    } else if (controlAccessNumber === i) {
      access = true;
    } else {
        userAccessNumber -= i;
      };
    };
  return access;
  };
