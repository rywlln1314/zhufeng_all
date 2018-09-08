/*
* 匹配18到65的年龄段
*
* */
var reg = /^(1[89]|[25]\d|6[0-5])$/;
reg.test('54');

for (let i = 10; i < 70; i++) {
    console.log(i,reg.test(i));
}