/*
* 通过正则
* */
var str = '2018/08/08 12:24:34';
var str2 = '今天是2018年8月8号 中午12点24分34秒';

var reg = /[/: ]/g;
var ary = str.split(reg);
var str3 = `今天是${ary[0]}年${ary[1]}月${ary[2]}号 中午${ary[3]}点${ary[4]}分34秒`;


var reg2 = /(\d+)/g;
str.replace(reg2,function () {
    var arg = [...arguments];
    console.log(arg[0][1]);
});







