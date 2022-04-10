// 1.申明对象类型

import { type } from "os";

// 之前我们已经通过type关键字声明过对象的类型了,例如
type InfoType = { name: string; age: number };
// 除此之外,我们还可以通过接口(interface)类声明对象类型
// 补充: 在定义接口的时候,有一个命名规范:在名称前面加一个大写的I,表示这是一个接口
interface IInfoType1 {
  name: string;
  age: number;
}
const info: InfoType = {
  name: "张三",
  age: 15,
};
const info1: IInfoType1 = {
  name: "张三",
  age: 15,
};

// 2.索引类型
// 在实际开发过程中,我们经常会遇到这样一个场景,使用中括号加字符串的形式,来获取对象中的某个属性的值(obj['key'])
// 那么我们就可以这样来定义接口
interface IObjectType {
  [key: string]: string;
}
const obj: IObjectType = {
  k1: "v1",
  k2: "v2",
  k3: "v3",
};
console.log(obj["k1"]);
// 注意: 索引的类型只支持数字类型与字符串类型

// 3.函数类型
// 3.1之前我们用过type来定义函数类型
type Add = (num1: number, num2: number) => number;
const add: Add = (n1: number, n2: number): number => {
  return n1 + n2;
};
// 3.2此外,我们还可以通过接口来定义函数类型
interface Mul {
  (n1: number, n2: number): number; //请注意小括号后面不是箭头,而是冒号
}
const mul: Mul = (n1: number, n2: number): number => {
  return n1 * n2;
};
// 虽然接口也可以用来定义函数类型,可是,从可阅读性上来说,还是推荐使用type来定义函数类型

// 4.接口的继承
// 接口与类很相似,也有继承的功能,但接口的特殊在于可以实现多继承, 如下:
interface ISwim {
  swimming: () => void;
}
interface IFly {
  flying: () => void;
}
interface IAction extends ISwim, IFly {}
// 虽然IAction这个接口中什么属性/方法都没定义,但是如果action为一个空对象时,就会报错
// 因为IAction继承自ISwim与IFly,而这两个父接口中风别定义了swimming与flying这两个方法
// 所以,只有在action这个对象中声明swimming与flying方法后,才可以通过类型检查
const action: IAction = {
  swimming() {},
  flying() {},
};

// 5.交叉类型 &
// 回想一下,之前我们使用的是什么方式来组合类型的?
// 没错就是联合类类型
type Utype = number | string;
type Direction = "left" | "right" | "center";
type a = { name: string };
type b = { age: number };
type c = a | b;
// 我们可以注意到上面定义的联合类型(Utype/Direction/c)中,每种类型都是用的竖线来进行连接的.表示的意思是"或"
// 此次我们要学的交叉类型表示的就是"与"了
interface IRun {
  running: () => void;
}
interface IWalk {
  walking: () => void;
}
type HumanMoving = IRun & IWalk;
const humanMoving: HumanMoving = {
  running() {},
  walking() {},
};
// 小结: 交叉类型与上面所学的 4.接口的继承-多继承 表达的功能是相似的,都是将两个接口以"与"的方式,组合在一起

// 6.接口的实现 implements
// 接口的实现,是针对于类而言的
// 对于类来说:
// 一个类只能继承自一个父类
// 一个类可以实现多个接口
// 例如:
interface IEat {
  eating: () => void;
}
interface IJump {
  jumping: () => void;
}
class Human {}
class Student extends Human implements IEat, IJump {
  eating() {
    console.log("student Eating");
  }
  jumping() {
    console.log("student Jumping");
  }
}
// 接口的实现的应用场景: 编写一些公用的方法(函数)时,我们可以面向接口编程
function eatAction(eatable: IEat) {
  eatable.eating();
}
eatAction(new Student()); // 因为学生(Student)实现了吃(IEat)的接口,所以能够作为参数传递
eatAction({
  eating() {
    console.log("anything Eating");
  },
}); // 也因为作为参数的这个对象中也存在eating这个方法,所以也能编译通过

// 7.interface与type的区别
// 7.1虽然interface与type都能定义对象类型,但是定义非对象类型时通常推荐使用type,比如direction/Alignment/一些Function
// 7.2那么在定义对象类型时,二者的主要区别在于,interface可以重复对某个接口来定义属性和方法的,而type定义的是别名,别名是不能重复的
interface IInterface {
  name: string;
}
interface IInterface {
  age: number;
}
const iInterface: IInterface = {
  name: "必须同时包含name和age",
  age: 18,
};

type MyType = {
  name: string;
};
/*
error TS2300: Duplicate identifier 'MyType'  重复声明'MyType'
type MyType = {
  age: number;
};
*/
// 这个特性的意义在于TypeScript会在其lib中默认给我们内置一些诸如Window,Document,HTMLElement...等类型,当我们想在其基础上添加一些属性或方法时,就可以利用到interface的这个特性

export {};
