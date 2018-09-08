function getCss(ele,attr) {
    var res = null;
    var reg = /MSIE *[5-8]/;
    if (!reg.test(navigator.userAgent)){

    }
    
    
    
    try{
       res = window.getComputedStyle(ele)[attr]
    }catch (e){
       res = ele.currentStyle[attr];
       //兼容IE 6-8
    }
    return res
}
getCss(oDiv,'width');

/*
* 提高函数的适用率
*
* 返回值是数字加单位的 直接处理成数字返回
* 不是数字加单位的 直接返回原值
* */
function getCss(ele,attr) {
    var res = null;
    var reg = /[-+]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?/;
    try{
        res = window.getComputedStyle(ele)[attr]
    }catch(e){
        res = ele.currentStyle[attr]
    }
    if (reg.test(res)){
        reg = parseFloat(res)
    }
    return res
    if (!isNaN(parseFloat(res))){
        res = parseFloat(res);
    }
    return res
}


/*
* 使用浏览器版本判断是否是IE浏览器
* */