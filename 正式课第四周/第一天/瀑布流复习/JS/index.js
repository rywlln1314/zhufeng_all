var data = null;
function getData(){
    var xhr = new XMLHttpRequest();
    xhr.open('get','JSON/data.json',false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = utils.toJson(xhr.responseText)
        }
    };
    xhr.send()
}
getData();
console.log(data);

var box = document.getElementsByClassName('box')[0];
var oUls = box.getElementsByTagName('ul');
var oImgs = box.getElementsByTagName('img');

function giveHtml(data) {
    data.forEach(function (item) {
        var {pic,title,height} = item;
        var li = document.createElement('li');
        var str = `
            <img src="http://www.sucaijishi.com/uploadfile/2013/0527/20130527034921885.gif" alt="" realSrc = "${pic}" height="${height}">
            <p>${title}</p>
        `;
        li.innerHTML = str;
        var temp = getMinUl();
        temp.appendChild(li)
    })
}
giveHtml(data);
function getMinUl(){
    var ulAry = utils.toArray(oUls);
    ulAry.sort(function (a,b) {
        return a.clientHeight - b.clientHeight
    });
    return ulAry[0]
}


function loadImg(ele) {
    if (ele.loaded)return;
    var scrT = utils.scrollT();
    var cliH = utils.clientH();
    var tarT = utils.offset(ele).t;
    if (scrT + cliH > tarT){
        var realSrc = ele.getAttribute('realSrc');
        var temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.loaded = true;
            fadeIn(ele);
        };
        temp = null;
    }
}
function loadAll(eles) {
    for (let i = 0; i < eles.length; i++) {
        loadImg(eles[i])
    }
}
loadAll(oImgs);
window.onscroll = function () {
    loadAll(oImgs);
    getMore();
};

function getMore(){
    var srcT = utils.scrollT();
    var cliH = utils.clientH();
    var temp = getMinUl();
    var tarT = temp.clientHeight + utils.offset(temp).t;
    if (srcT + cliH > tarT){
        getData();
        giveHtml(data);
    }
}
function fadeIn(ele){
    ele.style.opacity = 0;
    var opa = 0.1;
    var timer = setInterval(function () {
        opa += 0.1;
        ele.style.opacity = opa;
        if (opa >= 1){
            clearInterval(timer);
            ele.style.opacity = 1
        }
    },20)
}