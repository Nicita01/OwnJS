# MyPromise

This is the first version of my promise, which at the moment works as a standard promise and supports methods:
-**then**
-**case**
## Usage

For create new promise, write:
```js
const promise = new MyPromise(executor);
```
Then, you can add handlers using commands:
```js
promise.then(onFulfilled, onRejected)
promise.catch(onRejected)
```
