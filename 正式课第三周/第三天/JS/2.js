var oDiv = document.getElementById('div1');
function setCss(ele,attr,value) {
    ele.style[attr] = value;
}
setCss(oDiv,'color','#ccc');
setCss(oDiv,'fontSize','25px');//在JS中，所有用-分离的属性我们都转成驼峰命名
setCss(oDiv,'margin','25px');