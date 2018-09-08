function on(ele,type,f) {
    if (/^my/.test(type)){
        type = type || [];
        var n = type.indexOf(f);
        if (n > -1)return;
        type.push(f);
    }else{
        type = type.replace(/^on/g,'');
        ele.addEventListener(type,f,false)
    }
}
function fire(ele,type) {
    type = type || [];
    type.forEach((item)=>{
        item && item.call(ele)
    })
}
function off(ele,type,f) {
    if (/^my/.test(type)){
        type = type || [];
        var n = type.indexOf(f);
        if (n != -1){
            type.splice(n,1)
        }
    }else{
        type = type.replace(/^on/g,'');
        ele.removeEventListener(type,f,false)
    }

}