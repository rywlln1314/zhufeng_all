/*
* match 属于字符串中的方法
* */

var reg = /\d+/;
var str = '珠峰2018珠峰2019';

str.match(reg);
reg.exec(str);

/*
* 当正则上面不加全局修饰符 g 时；match方法和exec返回的结果是一样的
* */

var reg2 = /\d+/g;
var str2 = '珠峰2018珠峰2019';

str2.match(reg2);
reg2.exec(str2);

/*
* 当正则加上 全局修饰符 G 时；match 方法会把字符串中所有符合大正则的内容捕获到
* */

var reg3 = /(\d+)([a-z]+)/;
var str3 = 'zhufeng2018zhufeng2019';

str3.match(reg3);
//有g这个修饰符时；match只能捕获到大正则捕获的内容

reg3.exec(str3);
//第一项是大正则捕获到的内容
//第二项是第一个小分组捕获到的内容
//第三项是第二个小分组捕获到的内容
