# Objects' logger

Do you know how *console.log* is actually working? If to him in parameters to transfer one object, here that will occur:\
1) First, the *console.log* will try to find the mysterious field *Symbol(util.inspect.custom)* in the object. Unfortunately, I could not find information about what would happen if this field was found.\
/2) Then, there will be an attempt to find the mysterious field № 2 *inspect* in the object\
3 - 4) 3 and 4 step of accessing the object will receive an array of all internal fields of the object. Of course, there are many other actions between all these steps, such as filtering the elements of intermediate arrays for their belonging to a certain type, etc. I describe actions with direct access to the object.\
The next steps will be to obtain descriptor-objects for each field from the array received in one of the previous steps. Then, there will be an attempt to get the value of the *constructor* field. After that, the prototype of the user object will be obtained, which is rather strange, since the сonsole.log does not output fields from the prototype chain. Then there will be an attempt to find the *Symbol(Symbol.iterator)* field. And the last step will be to retrieve the descriptor-objects for each field that has an enumerable: foul. Agree, rather confusing work. And what if I pass the function to the *console.log*? Or several objects? Or a lot of different types of data? In addition, many functions can interact with the object, except for the *console.log*, such as *Object.getPrototupeOf* etc. Then it will be very difficult to foresee everything that the *console.log* will do. Especially it is felt by those who write heterogeneous interceptors for objects. It is difficult to intercept all calls, because you do not know what they can be in the built-in functions. This module will come to your aid. It logs all calls to objects, and also outputs all the parameters with which these calls are made

### How you can use it:

First of all, you need to install this module:
```bash
npm install obj-logger
```
Then, require module in program, where are that module, which you can log:
```js
const Logger = require('obj-logger');
```
The module returns one function, which is a factory that, on the basis of the provided object, creates a similar object, but has already become a logged.
Therefore, it makes sense to overwrite the old object, instead of creating a new one:
```js
let obj = {
  field: 'value',
}
obj = Logger(obj);
```
Now the object became logged\
All functions that will somehow interact with the object will be immediately escaped to the terminal, as well as their arguments will be displayed, and the result given to them
