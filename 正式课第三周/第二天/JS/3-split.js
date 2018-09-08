/*
* split 把字符串按照指定字符分割成数组
* */
var reg = /[,+-]/g;
var str = '珠峰，珠峰2-zhufeng+zhu';
str.split(reg);

var str2 = 'zhufeng123zhufeng2321zhufeng12324';
var reg1 = /\d+/g;
console.log(str2.split(reg1));
