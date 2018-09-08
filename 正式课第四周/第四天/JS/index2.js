var box = document.getElementById('box');
var oUl = box.getElementsByTagName('ul')[0];
var leftBtn = utils.getByClass('leftBtn',box)[0];
var rightBtn = utils.getByClass('rightBtn',box)[0];
console.log(leftBtn,rightBtn);
console.log(oUl);
var boxW = utils.css(box,'width');
console.log(boxW);
var n = 0;
var index = 0;
var timer = null;


var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','JSON/data.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
        data = utils.toJson(xhr.responseText)
    }
};
xhr.send();
console.log(data);
function giveHtml(data){
    data.push(data[0]);
    var str = '';
    data.forEach(function (item,index) {
        n = data.length;
        var {pic,title} = item;
        str += ` <li>
            <img src="${pic}" alt="">
            <p>${title}</p>
        </li>`;
        utils.css(oUl,'width',boxW*n);
        oUl.innerHTML = str;
    })
}
giveHtml(data);

function play() {
    index++;
    if (index >= n){
        utils.css(oUl,'left',0);
        index = 1
    }
    if (index == -1){
        utils.css(oUl,'left',-boxW*(n-1));
        index = n-2
    }
    console.log(index);
    var curL = -boxW*index;
    console.log(curL);
    //utils.css(oUl,'left',curL)
    myAnimate(oUl,500,{left:curL},'easeInOut')
}
function autoplay() {
    timer = setInterval(function () {
        play()
    },3000);
}
autoplay();
box.onmouseenter =function () {
    clearInterval(timer);
    utils.css(leftBtn,'display','block')  ;
    utils.css(rightBtn,'display','block')  ;
};
box.onmouseleave =function () {
    utils.css(leftBtn,'display','none')  ;
    utils.css(rightBtn,'display','none')  ;
    autoplay();
};
rightBtn.onclick = function () {
    play();
};
leftBtn.onclick = function () {
  index-=2;
  play();
};

