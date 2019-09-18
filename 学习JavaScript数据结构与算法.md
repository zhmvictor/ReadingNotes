# 学习JavaScript数据结构与算法

## 第一章  简介

### 三种调试环境

> Chrome --- 开发者工具：f12(快捷方式)

> Web服务器 --- Web Server for Chrome 插件

> Node.js --- http-server

- windows: `npm install http-server -g`
- Linux/Mac OS: `sudo npm install http-server -g`

### JavaScript基础

#### 真值和假值

数值类型 | 转换为布尔值
---|---
undefined | false
null | false
布尔值 | true是true、false是false
数 | +0、-0、NaN均为false，其他均为true
字符串 | 空字符串(length === 0)是false，其他均为true
对象 | true

#### == 和 === 的区别

- ==：
    - 类型相同的值，用 `equals` 方法比较
    - 类型不同的值，原始类型的值会转换成数值(toNumber)，对象会先转换成原始类型的值(toPrimitive)，再进行比较
    - 对象转换成原始类型值的方法有 `valueOf` 和 `toString`
- ===：
    - 严格相等
    - 比较的数据的值和类型均相等时才返回 true

#### OOP

> 在类(构造函数)的原型上声明方法和在类(构造函数)的定义里声明方法的区别

```
function Book(title, pages){
    this.title = title;
    this.pages = pages;
}
```
- 在构造函数的原型上声明方法：

```
Book.prototype.getTitle = function(){
    return this.title;
};
```
- 在构造函数的定义里声明方法：

```
function Book(title, pages){
    this.title = title;
    this.pages = pages;
    this.getTitle = function(){
        return this.title;
    };
}
```
- 区别：
    - 在构造函数的原型对象上声明的函数只会创建一次，并且在所有的实例中共享(原型链的继承)，可以节约内存和降低实例化的开销；
    - 在构造函数的定义里声明，则每个实例都会创建自己的函数副本；
    - prototype方法只能声明 public 函数和属性；
    - 类定义可以声明只在类的内部访问的 private 函数和属性。

---

## 第二章 ECMAScript 和 TypeScript

### TypeScript
#### 安装 TypeScript

```
npm install -g typescript
```

#### 类型推断
- TypeScript 有类型推断机制，会根据为变量赋的值自动给变量设置一个值类型

```
let age = 20; // 数值
let name = 'JavaScript'; // 字符串
let isSale = true; // 布尔值
```
- 如果声明时没有为变量设置初始值，变量的类型被自动设置为`any`，意思是可以接收任何类型的值
- 如果声明时没有为变量设置初始值，也可以手动为变量设置类型

```
let age: number; // 数值
let name: string; // 字符串
let isSale: boolean; // 布尔值
```

#### 接口   两种接口概念

> 第一种概念是把接口看作是一个实际的东西，是对一个对象必须包含的属性和方法的描述

**鸭子类型**
对象的行为符合接口定义的行为

```
interface Person{
    name: string;
    age: number;
}
function printName(person: Person){
    console.log(person.name);
}
const john = {name: 'John', age: 21};
const mary = {name: 'Mary', age: 21, phone: '123456'};
printName(john);
printName(mary);
```
> 第二种概念是抽象的，是一份合约，我们可以在合约里自定义实现这份合约的类或接口的行为

```
interface Comparable{
    compareTo(b): number;
}

class MyObject implements Comparable{
    age: number;
    compareTo(b): number{
        if(this.age === b.age){
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    }
}
```

**泛型**
动态的指定函数参数的类型

```
interface Comparable<T>{
    compareTo(b: T): number;
}

class MyObject implements Comparable{
    age: number;
    compareTo(b: MyObject): number{
        if(this.age === b.age){
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    }
}
```
#### TypeScript对JavaScript文件的编译时检查

- 在计算机上全局安装 TypeScript
- 在 JavaScript 文件的第一行添加 `// @ts-check`

---
## 第三章 数组