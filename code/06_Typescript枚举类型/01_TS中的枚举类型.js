"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 如今我们还可以这样定义这样一组元素可列举出来的类型 enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["LEFT"] = 0] = "LEFT";
    Direction1[Direction1["RIGHT"] = 1] = "RIGHT";
    Direction1[Direction1["TOP"] = 2] = "TOP";
    Direction1[Direction1["BOTTOM"] = 3] = "BOTTOM";
})(Direction1 || (Direction1 = {}));
// 如何使用呢? 我们可以视其为一个数组
function movingDirection(direction1) {
    switch (direction1) {
        case Direction1.LEFT:
            console.log("向左");
    }
}
