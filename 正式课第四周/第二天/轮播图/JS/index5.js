var data = null;
var xhr = new XMLHttpRequest();
var oDiv = document.getElementById('div1'),
    oUl = oDiv.getElementsByTagName('ul')[0],
    boxW = utils.css(oDiv,'width'),
    n = null,
    index = 0,
    leftBtn = oDiv.getElementsByClassName('left_btn')[0],
    rightBtn = oDiv.getElementsByClassName('right_btn')[0];



xhr.open('get','JSON/data.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);

function giveHtml() {
    var str = '';
    data.push(data[0]);
    n = data.length;
    data.forEach(function (item,index) {
        var {pic,title} = item;
        str += `<li>
            <img src="${pic}" alt="">
            <p>${title}</p>
        </li>`
    });
    utils.css(oUl,'width',boxW*n);
    oUl.innerHTML = str;
}
giveHtml();

function play() {
    index++;
    //utils.css(oUl,'width',-index*boxW)
    if (index>=n){
        index = 1;
        utils.css(oUl,'left',0)
    }
    var curL = -index*boxW;
    myAnimate(oUl,500,{left:curL})
}

function autoPlay() {
    var timer = setInterval(function () {
        play()
    },2000)
}
autoPlay();
leftBtn.onclick()