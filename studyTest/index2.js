// 你不知道的JavaScript（上卷） 第二部分 5.1.2--属性设置和屏蔽
function Father(name) {
  this.name = name;
}

Father.prototype.getName = function() {
  console.log(this.name);
};

function Child(name) {
  Father.call(this, name);
}

Child.prototype = Object.create(Father.prototype);
Child.prototype.constructor = Child;
Child.prototype.getName = function() {
  Father.prototype.getName.call(this);
};

let child = new Child('小明');
child.getName();