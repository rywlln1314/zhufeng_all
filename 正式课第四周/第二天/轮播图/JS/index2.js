var banner = (function () {
    var data = null,
        oDiv = document.getElementById('div1'),
        oUl = oDiv.getElementsByTagName('ul')[0],
        timer = null,
        boxW = utils.css(oUl,'width'),
        n = 0,
        index = 0,//记录当前显示图片的索引
        leftBtn = oDiv.getElementsByClassName('left_btn')[0],
        rightBtn = oDiv.getElementsByClassName('right_btn')[0],
        tipBox = oDiv.getElementsByClassName('tip_box')[0],
        tips = tipBox.getElementsByTagName('li');
    //获取数据
    function getData(){
        var xhr = new XMLHttpRequest();
        xhr.open('get','JSON/data.json',false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
                data = utils.toJson(xhr.responseText)
            }
        };
        xhr.send()
    }
    //把数据放到页面上
    function giveHtml() {
        var str = '';
        var tipStr = '';
        data.push(data[0]);
        data.forEach(function (item,index) {
            var {pic,title} = item;
            str += `<li>
<img src="${pic}" alt="">
            <p>${title}</p></li>`;
            if (index < data.length-1) {
                tipStr += `<li class="tip ${index == 0 ? 'current' : ''}">${index + 1}</li>`;
            }
        });
        n = data.length;
        oUl.style.width = boxW*n + 'px';
        oUl.style.position = 'relative';//设置定位
        oUl.innerHTML = str;
        tipBox.innerHTML = tipStr;
    }
    //自动播放
    function autoplay(){
        timer = window.setInterval(function () {
            play()
        },3000);
    }
    //事件绑定函数
    function eventFn() {
        rightBtn.onclick = function () {
            clearInterval(timer);
            play();

        };
        leftBtn.onclick = function () {
            if (utils.css(oUl,'left')%boxW !=0)return;
            clearInterval(timer);
            index -=2;//让index整体减2；他再play中又加了1；相当于ul整体左移一个
            play();

        };

        oDiv.onmouseenter = function () {
            //鼠标进入盒子 oDiv
            clearInterval(timer);
            utils.css(leftBtn,'display','block');
            utils.css(rightBtn,'display','block');
        };
        oDiv.onmouseleave = function () {
            //鼠标离开
            utils.css(leftBtn,'display','none');
            utils.css(rightBtn,'display','none');
            autoplay()
        };
    }
    //tip绑定函数
    function tipClick() {
        for (let i = 0; i < tips.length; i++) {
            tips[i].onclick = function () {
                index = i - 1;
                play()
            }
        }
    }
    return{
     init:function () {
         getData();
         giveHtml();
         autoplay();
         eventFn();
         tipClick()
     }
    }
})();
banner.init();