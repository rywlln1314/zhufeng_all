var reg = /\d+/g;
var str = 'zhufeng2018zhufeng2019';
str.replace(reg,',');

/*
* replace 支持正则；可以对整个字符串进行匹配和替换
* */
var str2 = str.replace(reg,function () {
    console.log(arguments);
    //第一项 大正则匹配的内容
    //第二项 第一个分组匹配的内容
    return '_____';
    //return 的内容是要替换正则匹配到的部分
});//这个函数体是在每一次要replace时，都先执行一次
console.log(str2);

var reg3 = /\d/g;
var str3 = str.replace(reg3,function () {
    var temp = arguments[0];
    temp = temp*1 + 1;
    return temp
});
//把reg3匹配到str的呢哦荣组合起来当作是否参传给后边的回调函数
//用回调函数的返回结果替换正则匹配到的内容

/*
* replace 的结合正则时的用法
* 1、str.replace(reg,'---')--->用'---'替换reg匹配到的内容
* 2、str.replace(reg,function(){})--->先把reg匹配到的内容组合起来；当作试产传给后边的函数；在用函数的返回结果替换正则匹配到的内容
*
*
* */