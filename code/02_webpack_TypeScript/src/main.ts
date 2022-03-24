import { sum } from "./math";

const res = sum(10, 20);
console.log(res);

const message: string = 'Hello TypeScript123111'
console.log(message);



const el = document.getElementById('app')
const child = document.createElement('div')
child.innerHTML = `<div>${message}</div>`
el?.appendChild(child)