// 1.类class
// 在JS中就存在类, 类有三大特性: 封装/继承/多态
// 为什么要定义类呢?就是为了减少重复行的代码,这就体现了类的封装性

// 2.类的定义
// TS中类在定义时,需要给变量进行初始化.否则会报错如下
/*
class Person {
  name: string; //error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor.
  age: number; // S2564: Property 'age' has no initializer and is not definitely assigned in the constructor.
}
*/
// 初始化变量的方式有两种:
// 方式一: 直接赋值, 这种情况下可以由TS的类型推断来判断变量的类型,当然也可以手动添加其类型注解
class Person1 {
  name = "张三";
  age = 18;
}
// 方式二: 在构造器(constructor)中对变量进行初始化
class Person2 {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const p1 = new Person1();
const p2 = new Person2("张三", 18);

// 3.类的继承
// 继承是多态的前提, 那么在什么情况下会使用到继承呢? 当在多个类中, 存在一些共有的变量与方法时, 为了减少一些重复代码的书写, 我们就可以使用类的继承.
class Person3 {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Student extends Person3 {
  stuNum: string;
  constructor(name: string, age: number, stuNum: string) {
    super(name, age);
    this.stuNum = stuNum;
  }
}
class Teacher extends Person3 {
  level: string;
  constructor(name: string, age: number, level: string) {
    super(name, age);
    this.level = level;
  }
}
const t = new Teacher("老师", 30, "高级教师");
const s = new Student("学生", 13, "003");
// 在上面这个例子中,Teacher与Student这两个类中本来都存在name与age属性, 如果分别都在其类中进行定义, 就会造成代码冗余,因此可以将其抽离出来,抽象到Person3这个类中, 然后让Teacher与Student分别继承Person3这个类,就达到了简化代码的目的了
// 补充知识: constructor中的super相当于Person3中的constructor(具体请查询https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)

// 4.类的多态
// 先举个例子
class Animal {
  moving(): void {
    console.log("animal moving");
  }
}
class Human extends Animal {
  // 类的继承中方法的重写,注意这和函数的重载的概念容易混淆
  moving(): void {
    console.log("human running");
  }
}
class Fash extends Animal {
  moving(): void {
    console.log("fash swimming");
  }
}
class Bird extends Animal {
  moving(): void {
    console.log("bird flying");
  }
}

// 在这个函数中,参数的类型仅为Animal[]
function makeMoving(animals: Animal[]) {
  animals.forEach((item) => {
    item.moving();
  });
}
// 为什么在类型为Animal[]中,还可以传入类似new Human()/new Fash()这样的参数呢?
// 这就是类的多态, 因为这些参数都是继承至Animal这个类的
makeMoving([new Animal(), new Human(), new Fash(), new Bird()]);
// 其运行过程就相当于如下代码
// const animal = new Animal()
// animal.moving() // animal moving
// const human = new Human()
// human.moving() // human running
// const fash = new Fash()
// fash.moving() // fash swimming
// const bird = new Bird()
// bird.moving() // bird flying

// 5.类的成员修饰符
// 在TS中类的属性和方法支持修饰符对其进行修饰与限制
// 5.1首先介绍这三种修饰符: public/private/protected
// public: 在类中定义属性与方式时,如果没写修饰符,那么默认就是public
// private: 修饰的是仅可使用类调用的属性与方法,实例中是不存在的. (值得注意的是私有属性的名字命名规范为:一般以下划线开头)
// protected: 修饰的是只能在类自身及子类中访问的属性和方法,在其实例中是访问不到的
class Abc {
  public a = 0;
  private _b = 1;
  protected c = 2;
  constructor() {
    console.log("private", this._b); // private 只能在类本身访问到
    console.log("protectd", this.c); // protected可以在类自身中访问
  }
  // 如何在外部访问到private属性呢? 
  // 方法一: 可以通过public方法
  getB() {
    return this._b;
  }
}
class Abcd extends Abc {
  constructor() {
    console.log('=========');
    super();
    console.log('=========');
    
    console.log("子类总访问父类的protected变量", this.c); // protected可以在子类中访问
  }
}
const abc = new Abc();
console.log("public", abc.a);
console.log("通过public方法访问到的private变量", abc.getB());
const abcd = new Abcd();

// 补充知识getter-setter
// 在上面的例子中我们通过getB这个方法,来获取到的私有属性_b
// 我们还可以使用访问器setter/getter来访问到_b属性
class Person4 {
  private _name: string;
  constructor(name: string) {
    this._name = name
  }

  // 访问器setter/getter
  // setter
  set name(newName: string) {
    console.log('通过setter设置name: ', newName);
    this._name = newName
  }
  // getter
  get name() {
    return 'getter: ' + this._name
  }
}

const p = new Person4('张三')
console.log(p.name);
p.name = '李四'

// 5.2 readonly修饰符
// 顾名思义,就是将属性变成只读属性,不能对其进行赋值操作(但是值得注意的是,只读属性可以在定义时赋值,还可以在constructor中进行赋值(即初始化赋值),此外便不能在对其赋值操作了)
class Person5 {
  readonly name: string
  constructor() {
    this.name = '张三'
  }
}
const person5 = new Person5()
console.log(person5.name);
// p4Instance.name = '123' //  error TS2540: Cannot assign to 'name' because it is a read-only property.

// 5.3类的静态修饰符-static
// static与private这两个修饰符其实是属于JS中的原生概念, static修饰符修饰的属性或方法,表示的意思就是这个属性或方法只能通过这个类进行读取或调用,其实例或子类都无法访问
class Person6 {
  static personName = '张三'
  static sayHi() {
    console.log('Hi');
  }
}
console.log(Person6.personName);
console.log(Person6.sayHi());


// 6.抽象类abstract
// 先来看一个需求: 定义一个根据不同形状,计算面积的方法.
// 举例: 矩形时, 长乘宽; 圆形时, 3.14乘以半径的平方
function getArea(shape: any) {
  return shape.calculateMethod()
}
// 疑惑一: 为什么不在getArea中通过if else进行判断呢?
// 答: 这虽然也是解决需求的方法,但是我们并不知道到底由多少中形状, 可能还有梯形/三角形等, 我们通过if else的方法时无法没枚举的所有分支的. 因此我们需要在调用时,执行其自身的计算方法.
class Rectangle {
  private _width: number;
  private _height: number;
  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  calculateMethod() {
    return this._width * this._height
  }
}

class Circle {
  private _r: number;
  constructor(r: number) {
    this._r = r
  }
  calculateMethod() {
    return this._r * this._r * 3.14
  }
}
getArea(new Rectangle(10, 20))
getArea(new Circle(10))
// 上面我们定义了两个形状的类矩形Rectangle和圆形Circle,然后我们就可以将其传入getArea方法中获得其面积
// 疑惑二: 此时的getArea方法的参数为any,那我们如果随意传值,那岂不是会存在安全隐患?
// 答: 是的,因此我们需要定义getArea的参数shape的类型
function getArea1(shape: Shape1) {
  return shape.calculateMethod()
}

class Shape1 {
  calculateMethod() {}
}

class Rectangle1 extends Shape1 {
  private _width: number;
  private _height: number;
  constructor(width: number, height: number) {
    super()
    this._width = width
    this._height = height
  }
  calculateMethod() {
    return this._width * this._height
  }
}
class Circle1 extends Shape1 {
  private _r: number;
  constructor(r: number) {
    super()
    this._r = r
  }
  calculateMethod() {
    return this._r * this._r * 3.14
  }
}
getArea1(new Rectangle1(10,20))
getArea1(new Circle1(10))
// 疑惑三: 因为Rectangle1与Circle1这两个类是继承自Shape的,当作参数传入当然没问题,可是我如果传入new Shape()作为getArea方法的参数呢?
// getArea1(new Shape1())// 编译时是不会报错的,但是执行过程中会报错
// 答: 此时我们就需要使用到抽象类, 因为抽象类是不能实例化的
function getArea2(shape: Shape2) {
  return shape.calculateMethod()
}
// 抽象方法只能存在与抽象类中 error TS1244: Abstract methods can only appear within an abstract class.
abstract class Shape2 {
  abstract calculateMethod(): number;
}
class Rectangle2 extends Shape2 {
  private _width: number;
  private _height: number;
  constructor(width: number, height: number) {
    super()
    this._width = width
    this._height = height
  }
  calculateMethod() {
    return this._width * this._height
  }
}
class Circle2 extends Shape2 {
  private _r: number;
  constructor(r: number) {
    super()
    this._r = r
  }
  calculateMethod() {
    return this._r * this._r * 3.14
  }
}
getArea2(new Rectangle2(10,20))
getArea2(new Circle2(10))
// getArea2(new Shape2()) // error TS2511: Cannot create an instance of an abstract class.
export {};
