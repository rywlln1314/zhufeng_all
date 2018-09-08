var utils = (function () {
    var flag = window.getComputedStyle ? false : true;
    //flag 为true 表示 IE6-8
    //惰性思想
    function getCss(ele,attr) {
        var str = navigator.userAgent;
        var res = null;
        if(/MSIE *[6-8]/.test(str)){
            //IE 6-8
            res = ele.currentStyle[attr]
        }else {
            res = getComputedStyle(ele)[attr];
        }
        /*
        * 先用parseFloat  处理这个字符串 若是 NaN ；则直接返回之前的字符串
        * */
        // if(!isNaN(parseFloat(res))){
        //     res = parseFloat(res);
        // }
        /*
        *
        * 用正则处理 --->
        * /[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?/
        * */
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/;
        res = reg.test(res) ? parseFloat(res) : res;
        return res;
    }
    function setCss(ele,attr,value) {
        //常用的需要加单位的属性
        var reg = /width|height|padding|margin|left|top|bottom|right|fontsize/i;
        if(reg.test(attr)){
            value = parseFloat(value) + 'px';
        }
        ele.style[attr]=value;
    }
    function setGroup(ele,obj){
        if(Object.prototype.toString.call(obj) == '[object Object]'){
            for(var k in obj){
                if(obj.hasOwnProperty(k)){
                    setCss(ele,k,obj[k])
                }
            }
        }
    }
    function css(...arg) {
        if(arg.length == 2){
            if(typeof arg[1] == 'string'){
                return getCss(arg[0],arg[1])
            }
            setGroup(arg[0],arg[1])
        }else {
            setCss(arg[0],arg[1],arg[2]);
        }
    }
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var temp = ele.offsetParent;
        while (temp && temp.nodeName.toLowerCase() != 'body'){
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {// l:l,t:t
            l,t
        }
    }
    function toArray (a) {
        var ary = [];
        try {
            ary = [].slice.call(a)
        }catch (e) {
            for(let i = 0; i < a.length; i++){
                ary.push(a[i])
            }
        }
        return ary
    }
    function toJson (str) {
        var obj = {};
        try{
            obj = JSON.parse(str);
        }catch (e) {
            obj = eval(`(${str})`);
        }
        return obj;
    }
    function scrollT() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function clientH() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
    function children(ele) {
        //先去拿到所有的子节点，然后再从这些子几点中筛选出元素子节点
        //var childs = ele.childNodes;
        //优化，直接循环children；可以减少循环次数
        var childs = ele.children;
        var ary = [];
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1){
                ary.push(childs[i])
            }
        }
        return ary
    }
    function getByClass(str,context) {
        //str 代表类名 ； context 代表上下文
        //思路 先去拿到context下所有的元素节点
        //然后再从这些节点中筛选出有str这个类名的
        context = context || document;
        var ary = [];//存放符合条件的元素
        //var eles = children(context);
        var eles = context.getElementsByTagName('*');
        //把context下所有的标签获取到
        //筛选 根据元素的类名中是否含有str
        //var reg = new RegExp('^ *'+str+' *$');//只可以匹配到单个类名的所有情况
        var reg = new RegExp('(^| +)'+str+'( +|$)');
        //以str开头满足情况  以str结尾的满足 以空格开头满足 以空格结尾的满足
        for (let i = 0; i < eles.length; i++) {
            //用正则判断eles[i].className 中是否含有str这个类名
            if (reg.test(eles[i].className)){
                ary.push(eles[i])
            }
        }
        return ary
    }
    function hasClass(ele,str) {
        str = replace(/^ +| +$/g,'');
        var ary = str.split(/ +/);
        for (let i = 0; i < ary.length; i++) {
            var reg = new RegExp("(^| +)"+ary[i]+"( +|$)");
            if (!reg.test(ele.className)){
                return false
            }
        }
        return true
    }
    function addClass(ele,str) {
        str = str.replace(/^ +| +$/g,'');//去除首位空格
        if (hasClass(ele,str))return;//如果之前有这个类名；直接return
        var ary = str.split(/ +/);//把str分割成数组，每一项都是类名
        for (let i = 0; i < ary.length; i++) {
            if (!hasClass(ary[i])){
                ele.className +=(' ' + ary[i]);
            }
        }

    }
    return{
        // getCss:getCss
        getCss,setCss,setGroup,css,toArray,toJson,offset,scrollT,clientH,children,getByClass,hasClass,addClass
    }
})();