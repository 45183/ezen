// 내가 설치한 sample_package 불러오기
const calc = require("sample_package"); 

const a = 17;
const b = 3;

console.log("a + b = ", calc.add(a, b));
console.log("a - b = ", calc.sub(a, b));
console.log("a * b = ", calc.multi(a, b));
console.log("a / b = ", calc.div(a, b));