function on(ele,type,f) {
    if(/^my/.test(type)){
        ele[type]=ele[type] ||[];
        var n=ele[type].indexOf(f);
        if(n>-1)return;
        ele[type].push(f)
    }else{
        type=type.replace(/^on/g,'');
        ele.addEventListener(type,f,false);
    }
}
function fire(ele,type,options) {
    ele[type]=ele[type] ||[];
    ele[type].forEach((item)=>{
        item&&item.call(ele,options)
    })
}
function off(ele,type,f) {
    if(/^my/.test(type)){
        ele[type]=ele[type]||[];
        var n=ele[type].indexOf(f);
        if(n!=-1){
            ele[type].splice(n,1)
        }
    }else {
        type=type.replace(/^on/g,'');
        ele.removeEventListener(type,f,false)
    }
}
