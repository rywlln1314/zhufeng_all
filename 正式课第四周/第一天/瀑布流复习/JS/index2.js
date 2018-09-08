var data = null;
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
getData();
console.log(data);
var box = document.getElementsByClassName('box')[0];
var oUls = box.getElementsByTagName('ul');
var ulAry = utils.toArray(oUls);
var oImgs = box.getElementsByTagName('img');
function giveHtml(data) {
    data.forEach(function (item) {
        var li = document.createElement('li');
        var {pic,height,title} = item;
        var str = `<img src="images/1.jpg" height="${height}" realSrc="${pic}" alt="">
            <p>${title}</p>`;
        li.innerHTML = str;
        var temp = getMinUl();
        temp.appendChild(li)
    })
}
function getMinUl(){
    ulAry.sort(function (a,b) {
        return a.clientHeight - b.clientHeight
    });
    return ulAry[0]
}
giveHtml(data);
function loadImg(ele){
    if (ele.flag) return;
    var srcT = utils.scrollT();
    var cliH = utils.clientH();
    var tarT = utils.offset(ele).t;
    if (srcT + cliH >= tarT){
        var temp = new Image();
        var realSrc = ele.getAttribute('realSrc');
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.flag = true;
            fadeIn(ele)
        };
        temp = null
    }
}
function loadAll(eles){
    for (let i = 0; i < oImgs.length; i++) {
        loadImg(eles[i])

    }
}
loadAll(oImgs);
window.onscroll = function () {
    loadAll(oImgs);
    getMore();
};
function getMore() {
    var scrT = utils.scrollT();
    var cliH = utils.clientH();
    var temp = getMinUl();
    var tarT = utils.offset(temp).t + temp.clientHeight;
    if (scrT + cliH >= tarT){
        getData();
        giveHtml(data);
    }
}
function fadeIn(ele) {
    ele.style.opacity = 0;
    var opa = 0.1;
    var timer = setInterval(function () {
        opa += 0.1;
        if (opa >= 1){
            clearInterval(timer);
            opa = 1
        }
        ele.style.opacity = opa;
    },20)
}