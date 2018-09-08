var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get','./JSON/data.json',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();

var btn = document.getElementsByClassName('btn')[0];
var btnUl = btn.getElementsByTagName('ul')[0];
var btnLis = btnUl.getElementsByTagName('li');

var con = document.getElementsByClassName('content')[0];
var conUl = con.getElementsByTagName('ul')[0];
var conLis = conUl.getElementsByTagName('li');

function giveHtml(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
            <div class="pic"><img src="${data[i].picImg}" alt=""></div>
            <h3 class="pub">${data[i].title}</h3>
            <div class="price pub"><b>价格：</b><span>￥${data[i].price}</span></div>
            <div class="eva pub"><b>评论数：</b><span>${data[i].hot}</span></div>
            <div class="time pub"><b>上架时间：</b><span>${data[i].time}</span></div>
        </li>`
    }
    conUl.innerHTML = str
}

giveHtml(data);

var flag = 0;
var ary = ['price','hot','time'];

for (let i = 0; i < conLis.length; i++) {
    btnLis[i].onclick = function () {
        if (flag == 0){
            data.sort(function (a,b) {
                return a[ary[i]].toString().
            })
        }
    }

}