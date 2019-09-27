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

## 第六章 链表

### 链表

- 链表存储有序的元素集合，每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(指针或链接)组成；
- 链表是动态的数据结构。
- 链表与数组的区别在于链表在内存中不是连续存放的，因此无需移动其他元素就可以轻松为链表添加和移除元素，这一点优于数组。

```
class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

function defaultEquals(a, b) {
  return a === b;
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; //存储链表中元素数量
        this.head = undefined; // 链表第一个元素的引用(链表头)
        this.equalsFn = equalsFn // 比较链表元素是否相等的内部函数
    }
    // 根据给定元素的位置，返回该位置的元素
    getElementAt(index) {
        // 检查位置是否有效
        if(index >= 0 && index < this.count) {
            let node = this.head; // 初始化元素，丛链表第一个元素开始
            for(let i = 0; i < index && node != null; i++) {
                node = node.next; // 迭代链表
            }
            return node;
        }
        return undefined;
    }
    // 返回一个元素的位置
    indexOf(element) {
        let current = this.head;
        for(let i = 0; i < this.count && current != null; i++) {
            if(this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    // 向链表尾部添加元素
    push(element) {
        const node = new Node(element);
        let current; // 链表当前项，中间变量，用于循环访问链表
        if(this.head == null) {
            // 1. 链表为空，添加的是第一个元素
            this.head = node;
        } else {
            // 2. 链表不为空，向尾部追加元素
            current = this.head;
            while(current.next != null) {
                // 循环访问链表，直到current.next为null,表示当前链表最后一项
                current = current.next;
            }
            current.next = node;
        }
        this.count++; // 链表项数量增加
    }
    // 丛链表特定位置移除元素，并返回被移除的元素
    removeAt(index) {
        // 检查越界值
        if(index >= 0 && index < this.count) {
            let current = this.head;
            if(index === 0) {
                // 1. 移除链表第一项
                this.head = current.next;
            } else {
                // 2. 移除特定位置的某项
//              let previous;
//              for(let i = 0; i < index; i++) {
//                  previous = current; //  当前元素的前一个元素
//                  current = current.next; // 用current迭代链表节点
//              }
//              // 将当前元素的前一项的引用指向当前元素的下一项，跳过current，达到移除目的
//              // 当前节点会被丢弃在计算机内存中等着被垃圾回收器清除
//              previous.next = current.next;


                // 利用根据位置返回元素的函数重构代码
                // 找到当前位置的上一个元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element; // 返回的移除元素
        }
        // 如果index不是链表的有效位置，返回undefined
        return undefined;
    }
    // 在任意位置插入元素
    insert(element, index) {
        // 检查越界
        // 插入时index可以等于this.count，表示在链表尾部插入
        if(index >= 0 && index <= this.count) {
            // 生成节点
            const node = new Node(element);
            if(index === 0) {
                // 1. 在链表头部插入第一个元素
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                // 2. 在链表中间或尾部插入元素
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        // 位置无效，插入失败，返回false
        return false;
    }
    // 丛链表移除元素
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    // 查看链表节点数
    size() {
        return this.count;
    }
    // 检查链表是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 获取链表第一个元素
    getHead() {
        return this.head;
    }
    // 将链表对象转换为字符串
    toString() {
        if(this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for(let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}
```

### 双向链表

> 与普通链表的区别

- 双向链表的链接是双向的，一个链向下一个元素，一个链向前一个元素。
- 双向链表既有头指针(head)也有尾指针(tail)，因此双向列表有两种迭代方式：从头到尾，从尾到头。
- 双向列表的优势在于，即使迭代错过了要找的元素，也不需要回到起点从新迭代。

```
class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        // 对链表最后一个元素的引用
        this.tail = undefined;
    }
    // 在任意位置插入元素
    insert(element, index) {
        if(index >= 0; && index <= this.count ) {
            const node = new DoublyNode(element);
            let current = this.head; // 初始化当前节点
            if(index === 0) { // 1.在起点插入元素
                if(this.head == null) { // 空链表
                    // 头指针和尾指针均指向同一个节点
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if(index === this.count) { // 2.在尾部插入元素
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else { // 3. 在除了头部和尾部的任意位置插入元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = node;
                node.next = current;
                node.prev = previous;
                current.prev = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 在任意位置移除元素
    removeAt(index) {
        if(index >= 0 && index < this.count) {
            let current = this.head;
            if(index === 0) { // 1. 移除第一个元素
                this.head = current.next;
                // 如果只有一个元素，更新 tail
                if(this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if(index === this.count - 1) {
                // 2. 移除最后一项
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                // 3. 移除其他位置
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
```

### 循环链表

- 循环链表既可以单向引用，也可以双向引用；
- 与普通链表的区别：最后一个元素指向下一个元素的指针(tail.next)不是引用undefined，而是指向第一个元素(head)。
- 双向循环链表既有指向 head 元素的 tail.next，也有指向 tail元素的 head.prev。

```
// 单向循环链表
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }
    // 在任意位置插入元素
    insert(element, index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if(index === 0) { // 1. 在起点插入
                if(this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    this.head = node;
                    //找到最后一个元素，更新最后一个元素的指向
                    current = this.getElementAt(this.size());
                    current.next = this.head;
                }
            } else { // 2. 在其他位置插入
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 从任意位置移除元素
    removeAt(index){
        if(index >= 0 &&index < this.count) {
            let current = this.head;
            if(index === 0) {
                if(this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed; // 便于返回移除的元素
                }
            } else {
                // 不移除第一个元素，则不需要修改链表最后一个元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
```

### 有序链表

- 有序链表是保持元素有序的链表结构。

```
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};
// 用于排序的比较算法
function defaultCompare(a, b) {
    if(a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }
    // 获取插入元素的正确位置
    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for(; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if(comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
    // 插入元素
    insert(element, index = 0) {
        if(this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }
}
```

### 创建 StackLinkedList 类

- 可以使用 LinedList 及其变种作为内部数据结构创建其他数据结构，如：栈、队列、双向队列。

> 用双向链表创建栈

```
// 双向链表可以直接获取头和尾元素，减少过程消耗
// 时间复杂度和原始Stack实现相同，均为 O(1)
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push(element) {
        return this.items.push(element);
    }
    pop() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1);
    }
    peek() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    }
    toString() {
        return this.items.toString();
    }
}

```

---
## 第七章 集合

### 构建集合数据结构

- 无序且唯一
- 空集是不包含任何元素的集合
- 集合的势就是集合元素的个数
- 集合的三个特性：确定性、互异性、无序性

```
class Set {
    constructor() {
        this.items = {};
    }
    // 检查元素是否在集合中
    has(element) {
//      return element in this.items;
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    // 向集合添加元素
    add(element) {
        if(!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if(this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
}
```

### 集合运算

- 纯函数：没有副作用的方法和函数。纯函数不会修改当前的实例或参数，只会生成一个新的结果。

#### 并集
```
union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
}
```
#### 交集
```
intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if(otherValues.length - values.length > 0) {
        biggerSet = otherValues;
        smallerSet = values;
    }
    // 性能优化，迭代较小的集合，可以减少迭代次数，减少消耗
    smallerSet.forEach(value => {
        if(biggerSet.has(value)) {
            intersectionSet.add(value);
        }
    });
    return intersectionSet;
}
```

#### 差集

```
difference(otherSet) {
    const differenceSet = new Set();
    this.values.forEach(value => {
        if(!otherSet.has(value)) {
            differenceSet.add(value);
        }
    });
    return differenceSet;
}
```

#### 子集
```
isSubsetOf(otherSet) {
    if(this.size() > otherSet.size()) {
        return false;
    }
    let isSubset = true;
    /*
     * 用 every方法代替 forEach 方法
     * 可以实现一旦发现值不存在于 otherSet里就停止迭代，减少消耗。
     * forEach 方法在全部循环结束之前不能控制停止循环。
     * every 方法回调函数返回true时会继续执行，如果回调函数返回false, 循环会停止
     */
    this.values().every(value => {
        if(!otherSet.has(value)) {
            isSubset = false;
            return false;
        }
        return true;
    });
    return isSubset;
}
```

### ECMAScript2015 --- Set类

#### 模拟并集运算

```
const union = (setA, setB) => {
    const unionAB = new Set();
    setA.forEach(value => unionAB.add(value));
    setB.forEach(value => unionAB.add(value));
    return unionAB;
};
```

#### 模拟交集运算

```
const intersection = (setA, setB) => {
    const intersectionSet = new Set();
    setA.forEach(value => {
        if(setB.has(value)) {
            intersectionSet.add(value);
        }
    });
    return intersectionSet;
};
```

#### 模拟差集运算

```
const difference = (setA, setB) => {
    const differenceSet = new Set();
    setA.forEach(value => {
        if(!setB.has(value)) {
            differenceSet.add(value);
        }
    });
    return differenceSet;
};
```

#### 使用扩展运算符

三步：
1. 将集合转化为数组
2. 执行需要的运算
3. 将结果转化为集合

> 并集

```
new Set([...setA, ...SetB]);
```
> 交集

```
new Set([...setA].filter(x => setB.has(x)));
```
> 差集

```
new Set([...setA].filter(x => !setB.has(x)));
```

### 多重集或袋

- 集合数据结构不允许存在重复的元素
- 多重集允许向集合中插入之前已经添加过的元素
- 多重集可以用于计算集合中元素出现的次数(数据库系统应用广泛)
- 为了区分集合和多重集合，多重集合可以用中括号[] 括起来，但是多重集合仍具有无序性。

> 多重集合举例

{1, 1, 1, 2, 3, 3} 是多重集合

---
## 第八章 字典和散列表

### 字典

- 集合以"[值, 值]"的形式存储元素
- 字典以"[键, 值]"的形式存储元素
- 字典也称映射、符号表、关联数组
- 字典经常用来保存对象的引用地址

```
// 将对象转化为字符串的函数
function defaultToString(item) {
    if(item === null) {
        return 'NULL';
    } else if(item === undefined) {
        return 'UNDEFINED';
    } else if(typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
// 生成键值对格式
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}, ${this.value}]`;
    }
}
// 字典类
class Dictionary {
    constructor(toStrFn = defaultToString) {
        // 用于将对象键名转换为字符串
        this.toStrFn = toStrFn;
        // 存储字典中的元素， table[key] = {key, value}
        this.table = {};
    }
    // 向字典中添加新元素，如果key已存在，则已存在的value会被新值覆盖
    set(key, value) {
        if(key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    // 根据键值在字典中查找特定的数值
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 根据键值从字典中移除数据
    remove(key) {
        if(this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    // 检查字典中是否存在某个键值
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    // 清空字典
    clear() {
        this.table = {};
    }
    // 返回字典中包含值的数量
    size() {
        return Object.keys(this.table).length;
    }
    // 检查字典是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 将字典包含的所有键名以数组的形式返回
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }
    // 将字典包含的所有数值以数组的形式返回
    values() {
        return this.keyValues().map(valuePair => valuePair.value);
    }
    // 返回字典中所有[键, 值]对
    keyValues() {
//      return Object.values(this.table);
        // 如果不是所有浏览器都支持 Object.values 方法
        const valuePairs = [];
        for(const k in this.table) {
            if(this.hasKey(k)) {
                valuePairs.push(this.table[k]);
            }
        }
        return valuePairs;
    }
    // 迭代字典中所有的键值对。
    // callbackFn有两个参数：key 和 value
    // 该方法在回调函数返回false时被中止
    // 与Array 类中的every 相似
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for(let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if(result === false) {
                break;
            }
        }
    }
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for(let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}
```

### 散列表  HashMap/HashTable

```
// 将对象转化为字符串的函数
function defaultToString(item) {
    if(item === null) {
        return 'NULL';
    } else if(item === undefined) {
        return 'UNDEFINED';
    } else if(typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
// 生成键值对格式
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}, ${this.value}]`;
    }
}
// 散列表
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    // 散列函数
    loseloseHashCode(key) {
        if(typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for(let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }
    // 向散列表中添加新的项/更新散列表
    put(key, value) {
        if(key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    // 返回根据键值检索到的特定的值
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    // 根据键值从散列表中移除值
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if(valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
    // 返回字典中包含值的数量
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for(let i = 1; i < keys.length; i++) {
            objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}
```