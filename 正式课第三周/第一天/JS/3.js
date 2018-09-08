var reg1 = /x|y/;//字符串出现一个x或y
var reg1_1 = /[xy]/;//字符串出现一个x或y
var str1 = 'axsdt';
var str1_1 = 'abs';
var str1_2 = 'adxbs';
var str1_3 = 'adybs';
console.log(reg1.test(str1));//true
console.log(reg1.test(str1_1));//false
console.log(reg1.test(str1_2));//true
console.log(reg1.test(str1_3));//true

var reg2 = /^1|2$/;//以 1 开头 或者 以 2 结尾 的字符串
console.log(reg2.test('12345'));//true
console.log(reg2.test('23452'));//true
console.log(reg2.test('2323452'));//true
console.log(reg2.test('2345'));//false

var reg3 = /^(18|19)$/;//代表18 或者 19
console.log(reg3.test('18'));//true
console.log(reg3.test('1819'));//false

/*
* 分组的作用：
* 1、提升优先级
* 2、分组匹配 可以理解成大正则里边的小正则
* 3、分组捕获
* */

