var str = '130425199001271013';
/*
* 根据身份证号，展示出这个人的基本信息
*
* 这个人xx年xx月xx日出生的，性别xx
*
* */
var reg = /^\d{6}(\d{4})(\d{2})(\d{2})\d{2}(\d)[\dX]$/;
//reg.exec(str);
var ary = str.match(reg);
var str2 = `这个人${ary[1]}年${ary[2]}月${ary[3]}日出生的，性别${ary[4]%2 == 0 ? '女' : '男'}`;
console.log(str2);

var str3 = str.replace(reg,function () {
    var ary = [...arguments];
    return `这个人${ary[1]}年${ary[2]}月${ary[3]}日出生的，性别${ary[4]%2 == 0 ? '女' : '男'}`;
});
console.log(str3);