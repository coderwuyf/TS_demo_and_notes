// 1.枚举类型
// 将可能出现的值列举出来,定义在一个类型中
// 命名常量, 这个命名常量可以为number/string
// 1.1.枚举类型的使用
// 在之前我们也定义过如下类型
type Direction = "left" | "right" | "top" | "bottom";
// 如今我们还可以这样定义这样一组元素可列举出来的类型 enum
enum Direction1 {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}
// 如何使用呢? 我们可以视其为一个数组
function movingDirection(direction1: Direction1) {
  switch (direction1) {
    case Direction1.LEFT:
      console.log("向左");
  }
}

export {};
