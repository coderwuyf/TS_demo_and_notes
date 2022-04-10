"use strict";
// 1.申明对象类型
Object.defineProperty(exports, "__esModule", { value: true });
const info = {
    name: "张三",
    age: 15,
};
const info1 = {
    name: "张三",
    age: 15,
};
const obj = {
    k1: "v1",
    k2: "v2",
    k3: "v3",
};
console.log(obj["k1"]);
const add = (n1, n2) => {
    return n1 + n2;
};
const mul = (n1, n2) => {
    return n1 * n2;
};
// 虽然IAction这个接口中什么属性/方法都没定义,但是如果action为一个空对象时,就会报错
// 因为IAction继承自ISwim与IFly,而这两个父接口中风别定义了swimming与flying这两个方法
// 所以,只有在action这个对象中声明swimming与flying方法后,才可以通过类型检查
const action = {
    swimming() { },
    flying() { },
};
const humanMoving = {
    running() { },
    walking() { },
};
class Human {
}
class Student extends Human {
    eating() {
        console.log("student Eating");
    }
    jumping() {
        console.log("student Jumping");
    }
}
// 接口的实现的应用场景: 编写一些公用的方法(函数)时,我们可以面向接口编程
function eatAction(eatable) {
    eatable.eating();
}
eatAction(new Student()); // 因为学生(Student)实现了吃(IEat)的接口,所以能够作为参数传递
eatAction({
    eating() {
        console.log("anything Eating");
    },
}); // 也因为作为参数的这个对象中也存在eating这个方法,所以也能编译通过
