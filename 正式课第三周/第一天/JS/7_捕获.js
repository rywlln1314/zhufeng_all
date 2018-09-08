/*
* exec  获取字符串中 满足条件的字符或字符串
*
* */
var reg = /\d+/;
var str = '珠峰2018珠峰2018';
console.log(reg.test(str));//true
console.log(reg.exec(str));//true
/*
* ["2018", index: 2, input: "珠峰2018珠峰2018", groups: undefined]
* 第一项是整个正则捕获的内容
* 第二项开始  捕获的是每一个分组捕获的内容
* index 捕获的项开始的索引
* input 原始字符串
* */

var reg2 = /(\d+)/;
var str2 = '珠峰2018珠峰2018';
console.log(reg2.test(str2));//true
console.log(reg2.exec(str2));//true

/*
* 正则捕获的懒惰性；它只捕获字符串中第一个符合规则的部分；不会再去后面捕获
* 即使多次执行，也不会再去后边捕获
* 解决这个问题 我们需要在正则的后边加上全局修饰符 g；还得多次执行
* */

/*
* 需求  获取到字符串中所有条件的字符或字符串
* 思路 利用全局匹配修饰符的特性；一直查找直到返回null时，查找停止
* */
RegExp.prototype.execAll = function (str) {
    var temp;
    if (!this.global){
      var temp = this.exec(str) || [];
      temp.errorReason = '你没加全局修饰符';
      return temp
  }
  var ary = [];
  temp = this.exec(str);
  while (temp) {
      ary.push(temp[0]);
      temp = this.exec(str);
  }
  return ary
};
