"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 基本数据类型
// 数字类型 整型、浮点型、十进制、0b二进制、0o八进制、0x十六进制
// 布尔类型 true、false
// 字符串类型 单引号、双引号、模板字符串
// 补充：默认可以类型推断时，一般不加类型推断，即变量声明时赋值
// 数组类型
// TS中的一个数组中存放不同的数据类型是一个不好的习惯
// 我们在定义数组时需要明确指定数组中存放的是什么类型的数组
// 有两种写法
// 写法一：（不推荐，原因：在jsx的语法中可能存在HTML标签'<div>'，同样的尖括号就会导致ts的编译器的语法分析阶段出现错误，导致错误判断）
const list1 = [];
console.log(list1);
// 写法二：（推荐）
const list2 = [];
console.log(list2);
// 对象类型
// 目前先使用类型推断，也就是声明对象时给对象赋值，更多的给对象声明类型的方法放在后面再说
const obj = {
    name: 'zhangsan',
    age: 18
};
console.log(obj);
// 此时我们将鼠标放在obj上时，编辑器推断出obj的类型如下
//  obj: {
//    name: string;
//    age: number;
//  }
// 也就是说此时如果我们再给obj对象添加除其他的属性时，就是不行的
// obj.sex = 'man'  => error TS2339: Property 'sex' does not exist on type '{ name: string; age: number; }'.
// null类型 和 undefined类型
// 这两种类型的类型推断就比较特殊，通过类型推断出来的结果却是any类型（这个类型等会再说）
let n = null;
let u = undefined;
console.log(n, u);
// Symbol类型
let s = Symbol('s');
console.log(s);
// 以上其实都是属于JS的数据类型
// 接下来就是TS独有的数据类型
// any类型
// 这个类型相当于就是不给变量设置类型，也就是说一个变量可以是string，也可以是number，也可以是boolean等
// 虽说使用这种类型很简单，但是如果频繁使用这种类型也就失去了使用TS的意义了，又变得和JS一样了
// 所以要谨慎使用这种类型
let a;
a = 123;
a = '123';
a = true;
a = {};
// unknown类型
// 这种类型用于描述类型不确定的变量，它和any类型的区别在于：
// unknown类型只能赋值给any类型和undefined类型的变量
// any类型可以赋值给任意类型的变量
let unk;
let message;
// message = unk; => error TS2322: Type 'unknown' is not assignable to type 'string'.
message = a; // 成功编译
// void类型
// 一般用在定义函数的返回值类型。当一个函数没有返回值或返回值为undefined时，类型推断这个函数的返回值类型就是个void，当然也可以手动添加上这个类型（但是没有必要）
function vo(p1, p2) {
    // 函数中没有return任何东西，或者返回为undefined时, 返回值类型就为void
    console.log(p1);
    console.log(p2);
    return undefined;
}
vo(1, '2');
// never类型
// 绝对不可能出现的类型，这怎么理解呢？
// 比如说一个函数，函数体内是一个死循环，导致这个函数永远不会有返回结果的时候，函数的类型就是一个never
function neverLoop() {
    while (true) {
    }
}
// 还有个性质就是任何类型的值都不肯能赋值给never类型
// 解释一下下面这个handleEvent函数
// params的类型为联合类型（后面会说到），也就说可以为number,也可以是string
// 函数是没有返回值的
function handleEvent(params) {
    // 于是针对参数的不同类型，做出不同的处理
    switch (typeof params) {
        case 'string':
            // 参数为string时的处理
            break;
        case 'number':
            // 参数为number时的处理
            break;
        // 为什么要写这个default？
        // 一般情况下这个函数都只会走上面两种类型的分支，如果传入其他类型的值时就会编译不通过
        // 可是在需要对这函数扩展类型时，就会出现只修改了参数的类型说明，而没有添加扩展参数类型的处理
        // 那么这种情况就会走到这个default分支中
        // 又因为任意类型的值都不能赋值给never类型，所以到这里也会导致编译不通过，从而迫使扩展者需要添加对新类型的处理的分支
        default: const check = params;
    }
}
// tuple类型
// tuple类型 => 元组类型
let arr = ['123', 123];
// 虽然说不推荐一个数组中存在不同类型的元素的，可是却也无法避免会有这种数据的出现，于是有了元组类型
// 这种类型也算属于数组类型，不过这种类型仅可描述可枚举且明确数组中每一个值的数据类型的情况下使用
// 先用react中的useState函数为例举个例子。
// 不用管这个函数具体时用来干什么的，只需要知道，这个函数值时一个数组，这个数组只会有两个元素，第一个元素姑且将其定义为any类型吧，而第二个元素为一个函数类型
function useState(state) {
    let currentState = state;
    const changeState = (newState) => {
        currentState = newState;
    };
    return [currentState, changeState];
}
const [state, changeState] = useState(10);
// 函数的参数和返回值类型
// 在前面多多少少都已经提到了
// 1.函数的参数类型： num1: number, num2: number 这里的意思就是参数num1与num2这两个的参数分别都是number
// 2.函数的返回值类型 function sum(...): number {} 这里')'后面的 : number 就是声明函数的返回值的类型为number
function sum(num1, num2) {
    return num1 + num2;
}
// 一般在开发过程中，可以不用写返回值的类型（当然这根据个人喜好），因为会自动推导出来的
// 对象类型
// 在前面已经初步了提及了对象类型，不过之前都是使用的类型推断，这里是主动写下类型注解
// 值得注意的是，对象类型中键与键之间的分割可以用逗号也可以用分号
let point1;
let point2;
// 可选类型
// 这个可选类型可以用在对象类型中，某个键可以不存在的情况下
let info;
// Union类型，也叫联合类型
// 联合类型可以由两个或多个其他类型组合而成的新类型，也就说联合类型可以是组成联合类型中的任意一种类型
// 联合类型中的每一种类型可以被称之为联合成员
let uni;
