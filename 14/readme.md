## 第 14 题：情人节福利题，如何实现一个 new
```js
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}

function Car(make, model, year) {
   this.make = make;
   this.model = model;
   this.year = year;
}

const mycar = _new(Car,"Eagle", "Talon TSi", 1993);
console.log(mycar) // Car {make:'Eagle',model:'Talon TSi',year:1993}
```
在知道了 new 关键字的是怎么调用的才能更好的理解上面的 _new() 函数
new 的调用 [new 运算符创建](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
1. 创建一个空的简单JavaScript对象也就是 `{}`
2. 链接该对象(也就是设置刚刚创建的空对象的构造函数)到另一个对象,也就是要 new 的目标对象
3. 将步骤1创建的新对象作为this的上下文
4. 如果该对函数没有返回对象,则返回 this

