function Banner(id,url) {
        this.data = null;
        this.url = url;
        this.oDiv = document.getElementById(id);
        this.oUl = this.oDiv.getElementsByTagName('ul')[0];
        this.timer = null;
        this.boxW = utils.css(this.oDiv,'width');
        this.n = 0;
        this.index = 0;//记录当前显示图片的索引
        this.leftBtn = this.oDiv.getElementsByClassName('left_btn')[0];
        this.rightBtn = this.oDiv.getElementsByClassName('right_btn')[0];
        this.tipBox = this.oDiv.getElementsByClassName('tip_box')[0];
        this.tips = this.tipBox.getElementsByTagName('li');
        this.init()
}
Banner.prototype = {
    constructor : Banner,
    getData : function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('get',this.url,false);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            this.data = utils.toJson(xhr.responseText)
        }
    };
    xhr.send()
},
    giveHtml : function giveHtml() {
    var str = '';
    var tipStr = '';
    this.data.push(this.data[0]);
    this.data.forEach((item,index)=> {
        var {pic,title} = item;
        str += `<li>
<img src="${pic}" alt="">
            <p>${title}</p></li>`;
        if (index < this.data.length-1) {
            tipStr += `<li class="tip ${index == 0 ? 'current' : ''}">${index + 1}</li>`;
        }
    });
        this.n = this.data.length;
        this.oUl.style.width = this.boxW*this.n + 'px';
        this.oUl.style.position = 'relative';//设置定位
        this.oUl.innerHTML = str;
        this.tipBox.innerHTML = tipStr;
},
    autoplay : function autoplay(){
    timer = window.setInterval(()=> {
        this.play()
    },3000);
},
    play : function play() {
    if (utils.css(this.oUl,'left')%this.boxW !=0)return;
        this.index++;
    if (this.index == -1){
        utils.css(this.oUl,'left',-this.boxW*(n-1));
        index = n-2;
    }
    if (this.index == this.n){
        utils.css(this.oUl,'left',0);
        this.index = 1
    }
    [...this.tips].forEach((item)=> {
        utils.removeClass(item,'current')
    });
    if (this.index == this.n - 1){
        utils.addClass(this.tips[0],'current');
    } else {
        utils.addClass(this.tips[this.index],'current')
    }
    var curL =-this.boxW*this.index;
    myAnimate(this.oUl,1000,{left:curL})
},
    eventFn : function eventFn() {
    this.rightBtn.onclick = ()=> {
        clearInterval(this.timer);
        this.play();
    };
        this.leftBtn.onclick =()=> {
        if (utils.css(this.oUl,'left')%this.boxW !=0)return;
        clearInterval(this.timer);
        this.index -=2;//让index整体减2；他再play中又加了1；相当于ul整体左移一个
        this.play();

    };
        this.oDiv.onmouseenter = ()=> {
        //鼠标进入盒子 oDiv
        clearInterval(this.timer);
        utils.css(this.leftBtn,'display','block');
        utils.css(this.rightBtn,'display','block');
    };
        this.oDiv.onmouseleave = ()=> {
        //鼠标离开
        utils.css(this.leftBtn,'display','none');
        utils.css(this.rightBtn,'display','none');
        this.autoplay()
    };
},
    tipClick : function tipClick() {
    for (let i = 0; i < this.tips.length; i++) {
        this.tips[i].onclick = ()=> {
            this.index = i - 1;
            this.play()
        }
    }
},
    init:function () {
        this.getData();
        this.giveHtml();
        this.autoplay();
        this.eventFn();
        this.tipClick();
    }
};