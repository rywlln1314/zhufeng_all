#### 免费课第一周第一天

> 前端的发展历程

> 前端页面的组成部分
 - html结构 (标记语言)
 - css 层叠样式表 （标记语言）
 - js  专门用来控制页面上跟用户的交互行为 （弱类型的脚本语言）

#### JS的组成部分

 > ECMAscript: 变量，语句，函数
 > DOM: 文档对象模型 （Document Object Model）存放的都是操作DOM的内容
 > BOM：浏览器对象模型 （Browser Object Model） window.history...

 ### JS的输出
  > - 目的咱们调试bug
  > alert()
  > console.log()
  > console.dir()
  > confirm() 有两个返回值 ，点击确定 返回true 点击取消返回 false

  >debugger // 相当于一个挡板， 把代码执行挡住，不让代码往下执行


  ###代码的执行
  > 咱们一般会把JS放到最下边， 把css放到上边


  > - 把JS放到下边 原因：
   - 1、 因为要操作DOM的时候我们必须保证 DOM已经被加载
   - 2、 当前边加载的JS特别大的时候，会影响整个页面的加载速度，导致页面出现空白期


###DOM的获取方法
 > - document.getElementById('元素的id名')
 > - document.getElementsByClassName('元素的类（class）名')
 > - document.getElementsByTagName('元素的标签名（div,span,a...）')

 > - get : 获取 拿到
 > - Element: 元素
 > - By : 通过
 > - Id : id名

 > - 通过ID获取元素时，只能获取第一个ID名，假如没有这个ID名字时，我们拿到的是个null
 > - 通过类名(或标签名)获取的是 **一组元素** ，要想拿到改组里边某一项时，我们要用索引获取
 > - 通过索引获取对应的元素 咱们用 [] 来获取 中括号里边时对应的索引


 ### 点（.） 在JS里边表示从属关系
 > 人的姓名  == 》 preson.name
 > class id style .... 他都是元素固有属性
 > zhufeng  :咱们自己给元素增加的属性  他叫自定义属性


 ### 变量 ---》可以变的量  产生变量的原因是为了缩减代码
 > var 变量名 = 变量值（随意）
 > var 1 = 2;
 > 变量名  可以是字符串（字母，_ ,$）
 var a1 = 2;
 > 不能用关键字和保留字去做变量名 （保留字 就是以后可能会变成关键字的单词）
 > - var var = 12;
 > 驼峰式命名 var perNameAge = 'zhufeng'



 ####JS的数据类型
  > - 1、基本数据类型（值类型） ： number(数字) string（字符串） boolean（布尔） null undefined
  > - 2、引用数据类型 ：对象-- 数组，Date,正则，普通对象，类数组。。。


 ###number数据类型
  > Number在转化引用数据类型的时候，会先把引用数据类型转换成字符串，然后再进行Number转化
  > Number('') Number('  ') ----> 0
  > Number(null)  ----> 0
  > Number(undefined) ----> NaN
  > Number(false)  ----> 0
  > Number(true)   ----> 1
 -----------
  > Number([]) ----> 0
  > Number({}) ---->NaN


  ------
  处理字符串时的规律
  parseInt('xxxx') -->从左往右 依次查看，碰到非数字或点 就截止，返回在这之前的字符
    parseInt('')  NaN
  parseFloat('xxxx')  ---> 从左往右 依次查看，碰到非数字 就截止。返回在这之前的字符
    parseFloat('') NaN


  ###  比较运算符 == :  a == b  判断 a 和 b 是否相等

  NaN  永远不等于  NaN

  isNaN(xxx)  判断xxx是否是NaN  若是 则返回 true  否则返回false
  isNaN(xxx) 运行的过程   先把xxx用Number转化一次 然后再去判断是不是NaN


  ####四则运算失败的时候也会出现NaN: + - * / %
  > 所有跟NaN做的运算，其结果全是NaN
  > + 号两边只有有一边时字符串，那就是字符串拼接


  ## String(字符串) 数据类型
    用单引号或双引号包起来的字符都是字符串;
    引号都是成对出现的 不能单引号和双引号混着用



  ## Boolean (布尔类型) true  false
  布尔类型为false的只有五个 0(数字0) null undefined  ''(空字符串) NaN
  ! : 取反  !true --> false; !false -->true

  !xxxx  -> 先用Boolean 把xxxx转化成布尔类型  然后再取反

  !! xxxx -> 相当于咱们的Boolean转换
  if('abc') --> 在条件语句中 会把条件转成布尔再去计算结果


  ## 判断数据类型
  typeof a  返回的时a的数据类型，返回的是个字符串；








