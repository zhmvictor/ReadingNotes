// 满足条件2
'use strict';
// 你不知道的JavaScript（上卷） 第二部分 5.1.2--属性设置和屏蔽
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
