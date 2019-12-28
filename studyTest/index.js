'use strict';
// 你不知道的JavaScript（上卷） 第二部分 5.1.2--属性设置和屏蔽
// 注意：存取器往往用于，属性的值依赖对象内部数据的场合(参考自阮一峰js标准参考教程：属性描述对象)
// 满足了条件3
let obj = Object.defineProperty({}, 'a', {
  get: function() {
    console.log('get value');
    return 2;
  },
  set: function(val){
    console.log('setter:', val);
    // this.value = val;
  },
  enumerable: true,
  configurable: true
});

// 不满足条件3的写法，对比，不满足的原因是？？？
// let obj = Object.defineProperty({}, 'a', {
//   get: function() {
//     console.log('get value');
//     return this.value;
//   },
//   set: function(val){
//     console.log('setter:', val);
//     this.value = val;
//   },
//   enumerable: true,
//   configurable: true
// });

console.log(obj);
console.log(obj.a);
console.log('-----------------------');
let myObj = Object.create(obj);
console.log(myObj);
console.log(myObj.a);
console.log('-----------------------');
myObj.a = 3;
console.log(myObj);
console.log(myObj.a);
console.log(obj.a);

