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