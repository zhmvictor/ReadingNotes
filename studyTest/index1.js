// 满足条件2
'use strict';
let obj = Object.defineProperty({}, 'foo', {
  value: 2,
  writable: false,
  enumerable: true,
  configurable: true,
});

let myObj = Object.create(obj);
console.log(obj);
console.log(obj.foo);
console.log(myObj);
console.log(myObj.foo);
myObj.foo = 3;
console.log(myObj);
console.log(myObj.foo);
console.log(obj.foo);
