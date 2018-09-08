var reg = /\d/;
var str = '珠峰2018珠峰2019';
reg.test(str);//true

var reg2 = /^\d/;//在这里^表示以什么开头   在[^]中的^表示非
var str2 = '珠峰2018珠峰2019';
var str2_1 = '2017珠峰2018珠峰2019';
console.log(reg2.test(str2));//false
console.log(reg2.test(str2_1));//true

var reg3 = /^\d{4}/;//匹配以四个数字开头的字符串
var str3 = '2108珠峰';
var str3_1 = '18祖峰';
console.log(reg3.test(str3));//true
console.log(reg3.test(str3_1));//false

var reg4 = /\d+$/;//以一个数字或者多个数字结尾的字符串
var reg4_1 = /\d$/;//以数字结尾的字符串
var reg4_2 = /\d{2}$/;//以连续两个数字结尾的字符串
var str4 = '2018珠峰';
var str4_1 = '2018珠峰2019';
var str4_2 = '2018珠峰0';
console.log(reg4.test(str4));//false
console.log(reg4.test(str4_1));//true
console.log(reg4.test(str4_2));//true

console.log(reg4_2.test(str4));//false
console.log(reg4_2.test(str4_1));//true
console.log(reg4_2.test(str4_2));//false

var reg5 = /\d/;//字符串中有没有数字
var reg5_1 = /^\d$/;//以数字开头，并且以数字结尾
var str5 = '珠峰2018培训';
var str5_1 = '1珠峰2018培训2';
var str5_2 = '1珠峰2018培训';
console.log(reg5_1.test(str5));//false
console.log(reg5_1.test(str5_1));//true
console.log(reg5_1.test(str5_2));//false


var reg7 = /^\d$/;//只能是一个数字
var reg7_1 = /^\d+$/;//以数字开头 以数字结尾；数字连续出有限1到多次
var str7 = '1';
var str7_1 = '123456';
var str7_1 = '123www456';
console.log(reg7.test(str7));//true
console.log(reg7.test(str7_1));//false
console.log(reg7_1.test(str7));//true
console.log(reg7_1.test(str7_1));//true
console.log(reg7_1.test(str7_2));//false

var reg8 = /hello world/;
var str8 = 'helloworld';
var str8_1 = '123 hello world 123';
var str8_2 = '123hello world123';
console.log(reg8.test(str8));//false
console.log(reg8.test(str8_1));//true
console.log(reg8.test(str8_2));//true

