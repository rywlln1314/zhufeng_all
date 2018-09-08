function on(ele,type,f) {//type对应报社的摸个频道
    if (/^(my)/.test(type)){
        ele[type] = ele[type] || [];
        var n = ele[type].indexOf(f);
        if (n > -1)return ;
        ele[type].push(f)
    } else{
        //需要判断type带不带on，若带着on就直接用，不带的话就不上
        if (/^(on)/.test(type)){
            ele[type] = f;
        } else{
            // ele['on'+type] = f;
            type = /^(on)/.test(type) ? type : 'on' + type;
            ele[type] = f;
            //ele.addEventListener(type,f,false)
        }

    }

}
function fire(ele,type) {
    ele[type].forEach((item)=>{
        item && item()
    })
}
function off(ele,type,f) {
    if (/^(my)/.test(type)){ele[type] = ele[type] || [];
        var n = ele[type].indexOf(f);
        if (n != -1){
            ele[type].splice(n,1)
        }
    }
    else{
        type = /^(on)/.test(type) ? type : 'on' + type;
        ele[type] = null
    }

}