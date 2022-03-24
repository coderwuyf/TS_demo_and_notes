"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// 类型断言 as
// 类型断言的作用在于，可以将一个相对来说比较宽泛的类型转成一个更加具体的类型
// 例如,此时页面上由一个\<img id="imageId"\>，这样一个html标签
const el = document.getElementById("imageId");
// 上面这段代码中，el的类型为HTMLElement | null
// 而我们此时如果像给这个el添加src属性时就会报两个错误
// el.src = '...(省略)'
// 错误一：el可能为null
// 错误二：HTMLElement上可能不存在src属性
// 而我们明确可以知道这个el对象一定是一个img元素，此时我们就可以使用类型断言(img标签元素的类型是HTMLImageElement)
const el1 = document.getElementById("imageId");
el1.src = "...(省略)";
// 类型断言一般用于变量在使用时，可以明确变量更细化的类型时才会添加，当然还有一种取巧的用法将变量先断言成any或unknown然后再断言成目标变量的类型，不过不推荐使用
// 非空类型断言 !.
// 这也是一种断言，也是在变量使用时才会添加
// 与上面的例子相似，此时我们有一个div元素，id为divId, \<div id="divId"\> \<\/div\>
const divEl = document.getElementById("divId");
// 此时如果需要给这个元素添加一个className属性, 会提示divEl这个对象可能为null
// divEl.className
// error TS2531: Object is possibly 'null'.
// 但我们明确可以知道这个divEl时存在的，此时我们就可以使用非空类型断言
divEl.className = "myClass";
// 然后有这样一个对象
const myInfo = {
    name: "myName",
};
// 当我们不清楚myInfo这个对象有没有friend这个属性时，想得到friend对象的name时，就可以使用可选链
console.log((_a = myInfo.friend) === null || _a === void 0 ? void 0 : _a.name);
// 当可选链中的变量不存在时，就会短路返回undefined。而有值时就会得到正确的值
// 补充知识 !! 与 ??
// 这两个运算符其实时JS中的知识
// !!的作用是将变量转换成boolean
// ??叫做空值合并操作符，也就是说，这个操作符的左侧的值只要不是null或undefined就取左侧的值，否则取右侧的值
const vari1 = "123";
const bool = !!vari1;
console.log(bool); // => true
const vari2 = "这是一段文字";
const message1 = vari2 !== null && vari2 !== void 0 ? vari2 : "默认文字";
console.log(message1); // => '这是一段文字'
const vari3 = null;
const message2 = vari3 !== null && vari3 !== void 0 ? vari3 : "默认文字";
console.log(message2); // => '默认文字'
// 其实!!的由来是这样的，本来一个感叹号的作用是将变量转换成boolean然后取反，如果再加一个感叹号相当与再取反一次，就实现了单纯将变量转换成boolean的作用了
// 而??类似于 简化版的三目运算符 以及 或运算符|| (请注意我这里说的是类似，并不完全一致哦)
// 比如上面的例子可以这样改写：
// const message1 = vari2 ? vari2 : '默认文字'
// const message1 = vari2 || '默认文字'
// 不过 ?? 与 || 也有区别
// 值1 ?? 值2  只有当值等于null或者undefined时，才会返回值2
// 值1 || 值2  值1被转换成boolean时，判断为true时，就会返回值1，反之返回值2
// 例如下面这种情况，这两种操作符返回的值就不一样了
const flag = false;
const res1 = flag !== null && flag !== void 0 ? flag : "默认值";
const res2 = flag || "默认值";
console.log(res1); // => false
console.log(res2); // => '默认值'
// 字面量类型——使用字符串、数字或布尔量，可以任意创造出一种类型，而这种类型统称为字面量类型
// 让我们看看下面这个代码
const direction = "top";
// 我们把鼠标放在变量direction上，就会发现它的类型是'top'
// 也就是说我们还可以这么写
let direction1 = "top";
let align;
align = "left";
console.log(align);
// 当然后面讲到的枚举类型也有这种功能，放在后面再讲
// 字面量推理 Literal Inference
// as const
// 例如：
function request(url, method) { }
const option = {
    url: "https://xxxx",
    method: "GET",
};
// 此时我们能将option的作为request参数吗？答案是不能的，因为此时类型推导出来的option的类型为：{url: string, method: string}
// 重点在于method属性, 因为string不能赋值给'GET' | 'POST'类型
// request(option.url, option.method)
// error TS2345: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
// 解决办法有两种：
// 第一种是给method直接添加类型断言 as 'GET'
request(option.url, option.method);
// 第二种是给option添加上字面量推理as const
const option1 = {
    url: "https://xxxx",
    method: "GET",
};
request(option1.url, option1.method);
// 声明一个exec函数，他的参数也是一个函数，这个函数必须符合AddFn这种类型，没有返回值void
function exec(fn) {
    // do something
}
// 这里再声明一个函数，add，他又两个参数都是number，且返回值是number，符合AddFn这中类型
function add(n1, n2) {
    return n1 + n2;
}
// add成功作为参数，传给exec函数
exec(add);
// **2.函数作为返回值**
function beforeAdd() {
    // do something
    return add;
}
// 函数的可选参数类型
// 之前说过可选类型是通过?:的方式来使用的，当一个函数的参数是可选的时候，我们也可以使用这个符合来表示
function print(x, y) {
    console.log(x, y);
}
print('10');
// 注意，我们需要尽可能的将可选的参数放在必选参数的后面，不然在调用函数的时候如果第一个参数不想传的时候，还得手动写成undefined才可以
// 函数的默认值
function fn(a, b = 'world') {
    console.log(a + b);
}
fn('hello'); // hello world
fn('hello', 'typescript'); // hello typescript
// 当然，默认参数也应尽量放在必传参数的后面
// 函数的剩余参数
// 当我们声明一个函数，可是不能确定参数的个数时，我们就会使用到函数的剩余参数，剩余参数一般是数组类型
function sum(initNum, ...nums) {
    let total = 0;
    total = nums.reduce((preVal, curVal) => {
        return preVal + curVal;
    }, initNum);
    return total;
}
sum(10, 20);
sum(10, 20, 30, 40);
