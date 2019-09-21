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

---
## 第四章 栈

遵循后进先出(LIFO)原则的有序集合。

### 基于数组的栈

```
class Stack {
    constructor() {
        // 用数组保存栈内的元素
        this.items = [];
    }
    // 添加新元素到栈顶
    push(element) {
        this.items.push(element);
    }
    // 移除栈顶元素，同时返回被移除的元素
    pop() {
        return this.items.pop();
    }
    // 返回栈顶元素，但不对栈做任何修改
    peek() {
        return this.items[this.items.length - 1];
    }
    // 判断栈是否为空，是为true，否则为false
    isEmpty() {
        return this.items.length === 0;
    }
    // 移除栈内所有元素(清空栈)
    clear() {
        this.items = [];
    }
    // 返回栈内元素的个数
    size() {
        return this.items.length;
    }
}
```

### 基于对象的栈

```
class Stack {
    constructor() {
        this.count = 0; // 记录栈的大小
        this.items = {}; // 保存栈内元素
    }
    // 向栈中插入元素
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 判断栈是否为空
    isEmpty(){
        return this.count === 0;
    }
    // 返回栈的大小
    size() {
        return this.count;
    }
    // 从栈中弹出元素
    pop() {
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        // 将栈顶值保存到一个变量
        const result = this.items[this.count];
        // 删除栈顶元素
        delete this.items[this.count];
        // 返回栈顶元素
        return result;
    }
    // 查看栈顶元素
    peek() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count - 1];
    }
    // 清空栈
    clear() {
        this.count = 0;
        this.items = {};
    }
    // toString 方法打印栈内元素
    toString() {
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[0]}`;
        for(let i = 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
```

### 基于对象的栈与基于数组的栈比较

- 使用数组时，大部分方法的时间复杂度是O(n)，并且数组是元素的一个有序集合，为了保证元素排列有序，会占用更多的内存空间。
- 使用对象可以直接获取元素，占用较少的内存空间，并且仍能保证所有元素按照我们的需要排序。

### 保护数据结构内部元素 --- 使属性变为私有
#### 下划线命名约定

默认约定，不能真正私有。
```
class Stack {
    constructor() {
        this._count = 0;
        this._items = {};
    }
}
```
#### Symbol限定作用域

使用`Object.getOwnPropertySymbols()`能够取到类里面声明的所有`Symbol`属性，不能真正私有。

```
const _items = Symbol('stackItems');
class Stack {
    constructor() {
        this[_items] = [];
    }
}
```
#### WeakMap

可以实现真正私有，但是该方法代码可读性不强，并且在扩展该类时无法继承私有属性。
```
const items = new WeakMap();
class Stack {
    constructor() {
        items.set(this, []);
    }
    push(element) {
        const s = items.get(this);
        s.push(element);
    }
    pop() {
        const s = items.get(this);
        const r = s.pop();
        return r;
    }
}
```
### 用栈解决问题
#### 进制转换算法

```
// decNumber: 十进制数， base: 其他进制基数
function baseConverter(decNumber, base) {
    const remStack = new Stack();
    // 进制字母表，十六进制以后0~9对应A~F
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = ''; // 转换后的进制字符串
    // 转换范围是2~36进制
    if(!(base >= 2 && base <= 36)){
        return '';
    }
    while(number > 0){
        rem = Math.floor(number % base); // 余数
        remStack.push(rem);
        number = Math.floor(number / base); // 商
    }
    while(!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

```
#### 其他应用实例
后期参考代码案例 `src/js/others`

### 使用场景

- 用在编程语言的编译器和内存中保存变量，方法调用等；
- 用于浏览器历史记录；
- 在回溯问题中，可以存储访问过的任务或路径、撤销的操作；
- Java 和 C# 用栈来存储变量和方法调用，特别是处理递归算法时，有可能抛出一个栈溢出异常。

---
## 第五章 队列和双端队列

### 队列

遵循先进先出(FIFO，也称先来先服务)原则的一组有序的项

```
class Queue {
    constructor() {
        this.count = 0; // 控制队列大小
        this.lowestCount = 0; // 追踪队列第一个元素
        this.items = {}; // 保存队列内部元素
    }
    // 向队列尾部添加新的项
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 移除队列第一项，并返回被移除的元素
    dequeue() {
        if(this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 查看队列头元素
    peek() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 检查队列是否为空，是为true，否则为false
    isEmpty() {
        // 计算count与lowestCount之间的差值
        return this.count - this.lowestCount === 0;
        // return this.size() === 0;
    }
    // 获取队列长度
    size() {
        return this.count - this.lowestCount;
    }
    // 清空队列
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // toString 方法打印队列
    toString() {
        if(this.isEmpty) {
            return '';
        }
        let objString = this.items[this.lowestCount];
        for(let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

```
### 双端队列

把栈和队列相结合的数据结构，可以同时从前端和后端添加和移除元素的特殊队列。

```
class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 在双端队列前端添加新元素
    addFront(element) {
        if(this.isEmpty()) {
            // 如果队列为空，直接向队列添加元素，此时后端即前端
            this.addBack(element);
        } else if(this.lowestCount > 0) {
            // 已经有元素从双端队列前端移除
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            // this.lowestCount 为 0
            for(let i = this.count; i > 0; i++) {
                // 把所有元素后移一位，空出第一个位置
                this.items[i] = this.items[i-1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    // 在双端队列后端添加新元素，实现方法与Queue类的enqueue()相同
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 在双端队列前端移除第一个元素，实现方法与Queue类的dequeue()相同
    removeFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 在双端队列后端移除第一个元素，实现方法与Stack类的pop()相同
    removeBack() {
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 返回双端队列前端第一个元素，实现方法与Queue类的peek()相同
    peekFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 返回双端队列后端第一个元素，实现方法与Stack类的peek()相同
    peekBack() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    // 检查对列是否为空
    isEmpty() {
        return this.count - this.lowestCount === 0;
        // return this.size() === 0;
    }
    // 查看队列长度
    size() {
        return this.count - this.lowestCount;
    }
    // 清空队列
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 打印队列
    toString() {
        if(this.isEmpty) {
            return '';
        }
        let objString = this.items[this.lowestCount];
        for(let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
```

### 使用队列和双端队列解决问题

#### 循环队列---击鼓传花游戏

> 规则

所有人围成一圈，把花尽快的传递给旁边的人。某一时刻传花停止，花在谁手上，谁就退出圆圈，结束游戏。重复这个过程，直到只剩一个人(胜者)。

```
function hotPotato(elementsList, num) {
	const queue = new Queue();
	const elimitatedList = [];
	for(let i = 0; i < elementsList.length; i++) {
		queue.enqueue(elementsList[i]);
	}
	while(queue.size() > 1) {
		for(let i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}
		elimitatedList.push(queue.dequeue());
	}
	return {
		elimitated: elimitatedList,
		winner: queue.dequeue()
	};
}
```
#### 回文检查器

> 回文

正反都能读通的单词、词组、数或一系列字符的序列，如：madam。

> 字符串反向排序检查回文

```
let str = 'madam';
console.log(str.split('').reverse().join('') === str);
```
> 使用双端队列检查回文最简单

```
function palindromeChecker(aString) {
	if(aString && aString.length) {
		const deque = new Deque();
		const lowerString = aString.toLocaleLowerCase().split(' ').join('');
		let isEqual = true;
		let firstChar, lastChar;
		for(let i = 0; i < aString.length; i++) {
			deque.addBack(aString.charAt(i));
		}
		while(deque.size() > 1 && isEqual) {
			firstChar = deque.removeFront();
			lastChar = deque.removeBack();
			if(firstChar !== lastChar) {
				isEqual = false;
			}
		}
		return isEqual;
	} else {
		return false;
	}
}
```

---

## 第六章