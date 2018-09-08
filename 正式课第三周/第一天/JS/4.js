/*
* 分组的作用：
* 1、提升优先级
* 2、分组匹配 可以理解成大正则里边的小正则
* 3、分组捕获
* */

var reg = /[abc]/;//字符串中有a或b或c
var reg1 = /^[abc]$/;//代表单个a b c
reg.test('abc');//true
reg.test('a');//true
reg1.test('abc');//false
reg1.test('c');//true

var reg2 = /^[abc]+$/;//a或b或c 出现一到多次
reg2.test('abc');//true
reg2.test('aaa');//true

var reg2 = /^abc$/;//只能匹配‘abc’  以a开头以c结尾 中间只能是b

var reg3 = /^ab+c$/;//以a开头以c结尾  中间一到多个b

var reg4 = /^[2.3]$/;//在中括号中的.是代表点这个符号本身
var reg6 = /^[2\.3]$/;//在中括号中的.是代表点这个符号本身
reg4.test('2.3');//false
reg4.test('2');//true
reg4.test('3');//true
reg4.test('.');//true

var reg5 = /^2.3$/; //以2开头 以3结尾  中间
reg5.test('2.3');//true
reg5.test('2+3');//true
reg5.test('2\n3');//false
reg5.test('2\3');//false

var reg7 = /^[\da-z]+$/;
reg7.test('qqq');//true
reg7.test('w3rsdf334r');//true
reg7.test('Asdf1323rqwr');//false

var reg8 = /^[^abc]$/;//除了abc的任意一个字符

var reg9 = /^2\.3$/;//只匹配2.3

