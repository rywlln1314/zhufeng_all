function Banner(id,url) {
    this.box = document.getElementById(id);//获取最外层的盒子
    this.oUl = utils.getByClass('ul_box', this.box)[0];//获取ul条
    this.data = null;
    this.url = url;
    this.boxW = utils.css(this.box, 'width');//存储和字的宽度
    this.index = 0;//要显示图片的索引
    this.n = 0;//存储图片的个数
    this.leftBtn = utils.getByClass('leftBtn',this.box)[0];
    this.rightBtn = utils.getByClass('rightBtn',this.box)[0];
    this.timer = null;
    this.tipBox = utils.getByClass('tip_box',this.box)[0];
    this.tips = this.tipBox.getElementsByClassName('tip');
}

Banner.prototype = {
    constructor: Banner,
    getData: function () {
        //获取数据
        var xhr = new XMLHttpRequest();
        xhr.open('get',this.url, false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                this.data = utils.toJson(xhr.responseText)
            }
        };
        xhr.send()
    },
    giveHtml: function () {
        this.data.push(this.data[0]);
        var str = '';//用来存储拼接的字符串
        var tipStr = '';//用来存储tip字符串
        this.data.forEach((item, index) => {
            var {pic, title} = item;
            str += `  <li>
            <img src="${pic}" alt="">
            <p>${title}</p>
        </li>`;
            if (index < this.data.length-1){
                tipStr += `<li class="tip ${index==0?'current':''}">${index+1}</li>`
            }
        });
        utils.css(this.oUl, {position: 'relative', width: this.data.length * this.boxW});
        this.n = this.data.length;
        this.oUl.innerHTML = str;
        this.tipBox.innerHTML = tipStr;
    },
    play: function () {
        //让图片滚动 控制oul的left值
        if (utils.css(this.oUl, 'left') % this.boxW != 0) return;
        this.index++;//index == this.n-1  是显示最后一张图；昨做完++后index变成了this.n
        if (this.index >= this.n) {
            utils.css(this.oUl, 'left', 0);
            this.index = 1;
        }
        if (this.index == -1){//左边界
            utils.css(this.oUl,'left',-this.boxW*(this.n-1));
            this.index = this.n-2
        }
        //this.index 0 1 2 3
        //this.tips  1 2 3 4
        [...this.tips].forEach((item)=>{
           utils.removeClass(item,'current')
        });
        if (this.index == this.n-1){
            utils.addClass(this.tips[0],'current')
        } else{
            utils.addClass(this.tips[this.index],'current')
        }
        // utils.css(this.oUl,'left',);
        myAnimate(this.oUl, 1000, {left: -this.boxW*this.index}, 'easeOut')

    },
    autoPlay: function () {
        this.timer = setInterval(function () {
            this.play()
        }, 3000);
    },
    eventFN:function () {
        //左事件绑定
        this.box.onmouseenter = ()=> {
            utils.css(this.leftBtn,'display','block');
            utils.css(this.rightBtn,'display','block');
            clearInterval(this.timer);
        };
        this.box.onmouseleave = ()=>{
            utils.css(this.leftBtn,'display','none');
            utils.css(this.rightBtn,'display','none');
            this.autoPlay();
        };
        this.rightBtn.onclick =() => {
            clearInterval(this.timer);
            this.play();
        };
        this.leftBtn.onclick = ()=>{
            if (utils.css(this.oUl,'left')%this.boxW !=0) return;
            clearInterval(this.timer);
            this.index -=2;
            this.play()
        }
    },
    tipClick:function () {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick =()=> {
                if (this.index == this.n-1){
                    utils.css(this.oUl,'left',0)
                }
                this.index = i-1;
                this.play();
            }
        }
    },
    init:function () {
        this.getData();
        this.giveHtml();
        this.autoPlay();
        this.eventFN();
        this.tipClick();
    }
};

var banner = new Banner('box','JSON/data.json');
banner.init();