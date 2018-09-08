var data = null;
var xhr = new XMLHttpRequest;
xhr.open('get','./JSON/data.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();

var oBtn = document.getElementsByClassName('btn')[0];
var oLis = oBtn.getElementsByTagName('li');

var oCon = document.getElementsByClassName('content')[0];
var oUl = oCon.getElementsByTagName('ul')[0];

function giveHtml(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
            <div class="pic"><img src="${data[i].picImg}" alt=""></div>
            <h3 class="pub">${data[i].title}</h3>
            <div class="price pub"><b>价格：</b><span>${data[i].price}</span></div>
            <div class="eva pub"><b>评论数：</b><span>${data[i].hot}</span></div>
            <div class="time pub"><b>上架时间：</b><span>${data[i].time}</span></div>
        </li>`
    }
    oUl.innerHTML = str
}
giveHtml(data);
var ary = ['price','hot','time'];
for (let i = 0; i < oLis.length; i++) {
oLis[i].onclick = function () {

    data.sort(function (a,b) {
        return a[ary[i]].toString().replace(/-/g,'') - b[ary[i]].toString().replace(/-/g,'')
    });
    giveHtml(data)
    };
};