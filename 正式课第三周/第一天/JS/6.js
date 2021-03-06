var str = '12.32';
var str = '12..32';
var reg = /^[+-]?(\d|[1-9]\d+)(\.?\d*)?$/;
//[+-]?  代表 正负号可能出现也可能不出现
//(\d|[1-9]\d+)   代表若斯一位数，则可以以0开头；若是多位数则必须以1-9之间的数字开头
//(\.\d+)?    代表小数点部分，出现0次或一次
reg.test();

/*
* 验证手机号
* */
var reg2 = /^1\d{10}$/;
reg2.test(12345678902);
var reg3 = /^1/;

/*
* 匹配邮箱
* qq  5到11位
* 163 126  6到18位
* */
var reg = /^([1-9]\d{4,10}@qq\.com|\w{6,18}@(163|126)\.com)$/;
var reg = /^([1-9]\d{4,10}@qq|\w{6,18}@(163|126)\.com)\.com$/;
